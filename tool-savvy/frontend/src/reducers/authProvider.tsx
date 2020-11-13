import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Auth0Client,
  Auth0ClientOptions,
  CacheLocation,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  PopupConfigOptions,
  RedirectLoginOptions as Auth0RedirectLoginOptions,
  GetTokenWithPopupOptions,
  GetTokenSilentlyOptions,
  GetIdTokenClaimsOptions,
} from '@auth0/auth0-spa-js';
import Auth0Context, { RedirectLoginOptions } from './authContext';
import { hasAuthParams, loginError, tokenError } from './utils';
import authReducer from './authReducer' 
import { initialState as initialAuthState } from './authReducer';

/**
 * The state of the application before the user was redirected to the login page.
 */
export type AppState = {
  returnTo?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export interface Auth0ProviderOptions {
  children?: React.ReactNode;
  /**
   * By default this removes the code and state parameters from the url when you are redirected from the authorize page.
   * It uses `window.history` but you might want to overwrite this if you are using a custom router, like `react-router-dom`
   * See the EXAMPLES.md for more info.
   */
  onRedirectCallback?: (appState: AppState) => void;
  /**
   * By default, if the page url has code/state params, the SDK will treat them as Auth0's and attempt to exchange the
   * code for a token. In some cases the code might be for something else (another OAuth SDK perhaps). In these
   * instances you can instruct the client to ignore them eg
   *
   * ```jsx
   * <Auth0Provider
   *   clientId={clientId}
   *   domain={domain}
   *   skipRedirectCallback={window.location.pathname === '/stripe-oauth-callback'}
   * >
   * ```
   */
  skipRedirectCallback?: boolean;
  
  domain: string;
  /**
   * The issuer to be used for validation of JWTs, optionally defaults to the domain above
   */
  issuer?: string;
  clientId: string;
  redirectUri?: string;

  leeway?: number;
  /**
   * The location to use when storing cache data. Valid values are `memory` or `localstorage`.
   * The default setting is `memory`.
   */
  cacheLocation?: CacheLocation;
  useRefreshTokens?: boolean;
  authorizeTimeoutInSeconds?: number;

  advancedOptions?: {
    /**
     * The default scope to be included with all requests.
     * If not provided, 'openid profile email' is used. This can be set to `null` in order to effectively remove the default scopes.
     *
     * Note: The `openid` scope is **always applied** regardless of this setting.
     */
    defaultScope?: string;
  };
  maxAge?: string | number;
  scope?: string;
  audience?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Replaced by the package version at build time.
 * @ignore
 */
declare const __VERSION__: string;

const toAuth0ClientOptions = (
  opts: Auth0ProviderOptions
): Auth0ClientOptions => {
  const { clientId, redirectUri, maxAge, ...validOpts } = opts;
  return {
    ...validOpts,
    client_id: clientId,
    redirect_uri: redirectUri,
    max_age: maxAge,
    auth0Client: {
      name: 'auth0-react',
      version: "1.0.0",
    },
  };
};

const toAuth0LoginRedirectOptions = (
  opts?: Auth0RedirectLoginOptions
): RedirectLoginOptions | undefined => {
  if (!opts) {
    return;
  }
  const { redirectUri, ...validOpts } = opts;
  return {
    ...validOpts,
    redirect_uri: redirectUri,
  };
};

/**
 * @ignore
 */
const defaultOnRedirectCallback = (appState?: AppState): void => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

const Auth0Provider = (opts: Auth0ProviderOptions): JSX.Element => {
  const {
    children,
    skipRedirectCallback,
    onRedirectCallback = defaultOnRedirectCallback,
    ...clientOpts
  } = opts;
  const [client] = useState(
    () => new Auth0Client(toAuth0ClientOptions(clientOpts))
  );
  const [state, dispatch]:[any,any] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        if (hasAuthParams() && !skipRedirectCallback) {
          const { appState } = await client.handleRedirectCallback();
          onRedirectCallback(appState);
        } else {
          await client.checkSession();
        }
        const user = await client.getUser();
        dispatch({ type: 'INITIALISED', user });
      } catch (error) {
        dispatch({ type: 'ERROR', error: loginError(error) });
      }
    })();
  }, [client, onRedirectCallback, skipRedirectCallback]);

  const loginWithRedirect = useCallback(
    (opts?: Auth0RedirectLoginOptions): Promise<void> =>
      client.loginWithRedirect(toAuth0LoginRedirectOptions(opts)),
    [client]
  );

  const loginWithPopup = useCallback(
    async (
      options?: PopupLoginOptions,
      config?: PopupConfigOptions
    ): Promise<void> => {
      dispatch({ type: 'LOGIN_POPUP_STARTED' });
      try {
        await client.loginWithPopup(options, config);
      } catch (error) {
        dispatch({ type: 'ERROR', error: loginError(error) });
        return;
      }
      const user = await client.getUser();
      dispatch({ type: 'LOGIN_POPUP_COMPLETE', user });
    },
    [client]
  );

  const logout = useCallback(
    (opts: LogoutOptions = {}): void => {
      client.logout(opts);
      if (opts.localOnly) {
        dispatch({ type: 'LOGOUT' });
      }
    },
    [client]
  );

  const userUpdatedAt = (state as any).user?.updated_at;

  const getAccessTokenSilently = useCallback(
    async (opts?: GetTokenSilentlyOptions): Promise<string> => {
      let token;
      try {
        token = await client.getTokenSilently(opts);
      } catch (error) {
        throw tokenError(error);
      }
      const user = await client.getUser();
      if (user.updated_at !== userUpdatedAt) {
        dispatch({ type: 'USER_UPDATED', user });
      }
      return token;
    },
    [client, userUpdatedAt]
  );

  const getAccessTokenWithPopup = useCallback(
    async (
      opts?: GetTokenWithPopupOptions,
      config?: PopupConfigOptions
    ): Promise<string> => {
      let token;
      try {
        token = await client.getTokenWithPopup(opts, config);
      } catch (error) {
        throw tokenError(error);
      }
      const user = await client.getUser();
      if (user.updated_at !== userUpdatedAt) {
        dispatch({ type: 'USER_UPDATED', user });
      }
      return token;
    },
    [client, userUpdatedAt]
  );

  const getIdTokenClaims = useCallback(
    (opts?: GetIdTokenClaimsOptions): Promise<IdToken> =>
      client.getIdTokenClaims(opts),
    [client]
  );
  return <Auth0Context.Provider 
          value={{
          ...state,
          getAccessTokenSilently,
          getAccessTokenWithPopup,
          getIdTokenClaims,
          loginWithRedirect,
          loginWithPopup,
          logout,
          }}>
            {children}
        </Auth0Context.Provider>
  
};

export default Auth0Provider;

