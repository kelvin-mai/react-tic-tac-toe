import { Game, GameState, PrismaClient } from '@prisma/client';

export const db = new PrismaClient().$extends({
  result: {
    gameState: {
      status: {
        needs: { state: true },
        compute({ state }: { state: string[] }) {
          if (state.filter((v) => v).length === state.length) {
            return 'tie';
          }
          const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          const win = combinations.filter((combo) => {
            const [a, b, c] = combo;
            return state[a] && state[a] === state[b] && state[a] === state[c];
          });
          if (win.length > 0) {
            return 'win';
          } else {
            return 'ongoing';
          }
        },
      },
    },
  },
});

export const computeCurrentState = (
  game: Game & { gameStates: GameState[] },
) => {
  return game.gameStates.reduce((prev, curr) => {
    return curr.turn > prev.turn ? curr : prev;
  });
};

export const gameWithCurrentState = (
  game: Game & { gameStates: GameState[] },
) => {
  return { ...game, currentState: computeCurrentState(game) };
};
