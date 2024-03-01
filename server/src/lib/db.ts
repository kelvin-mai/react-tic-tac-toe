import { Game, GameState, PrismaClient } from '@prisma/client';

export const db = new PrismaClient().$extends({
  result: {
    gameState: {},
  },
});

export const computeCurrentState = (
  game: Game & { gameStates: GameState[] },
) => {
  return game.gameStates.reduce((prev, curr) => {
    return curr.turn > prev.turn ? curr : prev;
  });
};
