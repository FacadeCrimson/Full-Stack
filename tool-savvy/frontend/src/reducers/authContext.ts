import {
    BaseLoginOptions,
    GetIdTokenClaimsOptions,
    GetTokenSilentlyOptions,
    GetTokenWithPopupOptions,
    IdToken,
    LogoutOptions,
    PopupLoginOptions,
    PopupConfigOptions,
  } from '@auth0/auth0-spa-js';
  import { createContext } from 'react';
  import { AuthState, initialState as initialAuthState } from './authReducer';
  
  export interface RedirectLoginOptions extends BaseLoginOptions {
    redirectUri?: string;
    appState?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    fragment?: string;
  }
  
  export interface Auth0ContextInterface extends AuthState {
    getAccessTokenSilently: (
      options?: GetTokenSilentlyOptions
    ) => Promise<string>;
  
    getAccessTokenWithPopup: (
      options?: GetTokenWithPopupOptions,
      config?: PopupConfigOptions
    ) => Promise<string>;
  
    getIdTokenClaims: (options?: GetIdTokenClaimsOptions) => Promise<IdToken>;
  
    loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  
    loginWithPopup: (
      options?: PopupLoginOptions,
      config?: PopupConfigOptions
    ) => Promise<void>;
  
    logout: (options?: LogoutOptions) => void;
  }
  
  const stub = (): never => {
    throw new Error('You forgot to wrap your component in <Auth0Provider>.');
  };
  
  const initialContext = {
    ...initialAuthState,
    getAccessTokenSilently: stub,
    getAccessTokenWithPopup: stub,
    getIdTokenClaims: stub,
    loginWithRedirect: stub,
    loginWithPopup: stub,
    logout: stub,
  };
  
  const Auth0Context = createContext<Auth0ContextInterface>(initialContext);
  
  export default Auth0Context;