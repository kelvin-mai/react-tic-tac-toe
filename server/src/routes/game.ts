import express from 'express';
import { generateId } from 'lucia';

import {
  gameWithCurrentState,
  db,
  computeCurrentState,
  computeGameStateStatus,
} from '@/lib/db';
import { ok, created, errorResponse } from '@/utils/response';
import {
  CONFLICT,
  GAME_DONE,
  GAME_NOT_STARTED,
  INVALID_MOVE,
  UNAUTHORIZED,
  WRONG_TURN,
} from '@/utils/errors';

export const gameRouter = express.Router();

gameRouter
  .route('/game')
  .get(async (req, res) => {
    const criteria = req.query.criteria;
    if (criteria === 'resume' && !res.locals.session) {
      throw UNAUTHORIZED;
    }
    const whereCriteria = (criteria: string) => {
      switch (criteria) {
        case 'available':
          return { playerXId: { not: res.locals.user?.id }, playerOId: null };
        case 'resume':
          return {
            OR: [
              { playerXId: res.locals.user?.id },
              { playerOId: res.locals.user?.id },
            ],
          };
        default:
          return {};
      }
    };
    try {
      const games = await db.game.findMany({
        where: {
          AND: [
            whereCriteria(criteria as string),
            { gameStates: { none: { status: 'win' } } },
            { gameStates: { none: { status: 'tie' } } },
          ],
        },
        include: {
          playerX: true,
          playerO: true,
          gameStates: {
            select: {
              status: true,
            },
          },
        },
      });
      return ok(res, { games });
    } catch (error) {
      return errorResponse(res, error);
    }
  })
  .post(async (_, res) => {
    try {
      if (!res.locals.session) {
        throw UNAUTHORIZED;
      }
      const game = await db.game.create({
        data: {
          id: generateId(14),
          playerXId: res.locals.user?.id!,
          gameStates: {
            create: [
              {
                turn: 0,
                state: Array(9).fill(null),
                status: 'new',
              },
            ],
          },
        },
      });
      return created(res, { game });
    } catch (error) {
      return errorResponse(res, error);
    }
  });

gameRouter
  .route('/game/:id')
  .get(async (req, res) => {
    try {
      const game = await db.game.findUniqueOrThrow({
        where: { id: req.params.id },
        include: {
          gameStates: true,
          playerO: true,
          playerX: true,
        },
      });
      return ok(res, { game: gameWithCurrentState(game) });
    } catch (error) {
      return errorResponse(res, error);
    }
  })
  .post(async (req, res) => {
    try {
      if (!res.locals.session) {
        throw UNAUTHORIZED;
      }
      const game = await db.game.findUniqueOrThrow({
        where: { id: req.params.id },
        include: {
          gameStates: true,
          playerO: true,
          playerX: true,
        },
      });
      if (
        game.playerXId !== res.locals.user?.id &&
        game.playerOId !== res.locals.user?.id
      ) {
        throw UNAUTHORIZED;
      }
      if (!game.playerOId) {
        throw GAME_NOT_STARTED;
      }
      const currentState = computeCurrentState(game);
      if (currentState.status === 'win' || currentState.status === 'tie') {
        throw GAME_DONE;
      }
      if (
        (currentState.turn % 2 === 0 &&
          game.playerXId !== res.locals.user.id) ||
        (currentState.turn % 2 !== 0 && game.playerOId !== res.locals.user.id)
      ) {
        throw WRONG_TURN;
      }
      const move = currentState.turn % 2 === 0 ? 'x' : 'o';
      const currentPlayer = move === 'x' ? game.playerXId : game.playerOId;
      if ((currentState.state as string[])[req.body.index]) {
        throw INVALID_MOVE;
      }
      const nextState = (currentState.state as string[]).map((v, i) =>
        i === req.body.index ? move : v,
      );
      const status = computeGameStateStatus(nextState);
      const nextGameState = await db.gameState.create({
        data: {
          turn: currentState.turn + 1,
          state: (currentState.state as string[]).map((v, i) =>
            i === req.body.index ? move : v,
          ),
          gameId: game.id,
          status,
          winnerId: status === 'win' ? currentPlayer : null,
        },
      });
      return created(res, {
        game: {
          ...game,
          currentState: nextGameState,
          gameStates: [...game.gameStates, nextGameState],
        },
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  });

gameRouter.route('/game/:id/join').post(async (req, res) => {
  try {
    if (!res.locals.session) {
      throw UNAUTHORIZED;
    }
    const found = await db.game.findFirstOrThrow({
      where: { id: req.params.id },
    });
    if (found.playerXId === res.locals.user?.id) {
      throw CONFLICT;
    }
    const game = await db.game.update({
      where: { id: req.params.id },
      data: {
        playerOId: res.locals.user?.id,
      },
    });
    return ok(res, { game });
  } catch (error) {
    return errorResponse(res, error);
  }
});
