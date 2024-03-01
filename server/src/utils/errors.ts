export const UNAUTHORIZED = Error('Unauthorized', { cause: { code: 401 } });
export const CONFLICT = Error('Resource Conflict', { cause: { code: 409 } });
export const INVALID_CREDENTIALS = Error('Invalid username or password', {
  cause: { code: 409 },
});
export const EXISTING_USER = Error('Username already taken', {
  cause: { code: 409 },
});
