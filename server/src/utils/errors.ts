export const UNAUTHORIZED = Error('Unauthorized', { cause: { code: 401 } });
export const CONFLICT = Error('Resource Conflict', { cause: { code: 409 } });
export const INVALID_CREDENTIALS = Error('Invalid username or password', {
  cause: { code: 409 },
});
export const EXISTING_USER = Error('Username already taken', {
  cause: { code: 409 },
});
export const GAME_NOT_STARTED = Error('Still waiting for another player', {
  cause: { code: 409 },
});
export const WRONG_TURN = Error('Not Your Turn', { cause: { code: 409 } });
export const INVALID_MOVE = Error('Invalid move', { cause: { code: 409 } });
export const GAME_DONE = Error('Game already complete', {
  cause: { code: 409 },
});
