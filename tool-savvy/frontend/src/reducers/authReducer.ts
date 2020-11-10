const initialState:AuthState = {
    isAuthenticated: false,
      // In SSR mode the library will never check the session, so loading should be initialised as false
    isLoading: typeof window !== 'undefined',
  }

export default function authReducer(state = initialState, action:Action) {
  switch (action.type) {
    case 'LOGIN_POPUP_STARTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_POPUP_COMPLETE':
    case 'INITIALISED':
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
        isLoading: false,
        error: undefined,
      };
    case 'USER_UPDATED':
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
}

type User = any;

type Action =
  | { type: 'LOGIN_POPUP_STARTED' }
  | {
      type: 'INITIALISED' | 'LOGIN_POPUP_COMPLETE' | 'USER_UPDATED';
      user?: User;
    }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: Error };

interface AuthState {
    error?: Error;
    isAuthenticated: boolean;
    isLoading: boolean;
    user?: User;
  }

export class OAuthError extends Error {
  constructor(public error: string, public error_description?: string) {
    super(error_description || error);
  }
}