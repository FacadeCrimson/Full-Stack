class OAuthError extends Error {
    constructor(public error: string, public error_description?: string) {
      super(error_description || error);
    }
}

const CODE_RE = /[?&]code=[^&]+/;
const STATE_RE = /[?&]state=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

export const hasAuthParams = (searchParams = window.location.search): boolean =>
  (CODE_RE.test(searchParams) && STATE_RE.test(searchParams)) ||
  ERROR_RE.test(searchParams);

const normalizeErrorFn = (fallbackMessage: string) => (
  error: Error | { error: string; error_description?: string } | ProgressEvent
): Error => {
  if ('error' in error) {
    return new OAuthError(error.error, error.error_description);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
};

export const loginError = normalizeErrorFn('Login failed');

export const tokenError = normalizeErrorFn('Get access token failed');