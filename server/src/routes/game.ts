import express from 'express';
import { generateId } from 'lucia';

import { computeCurrentState, db } from '@/lib/db';
import { ok, created, errorResponse } from '@/utils/response';
import { CONFLICT, UNAUTHORIZED } from '@/utils/errors';

export const gameRouter = express.Router();

gameRouter
  .route('/game')
  .get(async (_, res) => {
    try {
      const games = await db.game.findMany();
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
        },
      });
      const currentState = computeCurrentState(game);
      return ok(res, { game: { ...game, currentState } });
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
        },
      });
      if (
        game.playerXId !== res.locals.user?.id &&
        game.playerOId !== res.locals.user?.id
      ) {
        throw UNAUTHORIZED;
      }
      const currentState = computeCurrentState(game);
      const nextState = await db.gameState.create({
        data: {
          turn: currentState.turn + 1,
          state: req.body.state,
          gameId: game.id,
        },
      });
      return created(res, {
        game: {
          ...game,
          currentState: nextState,
          gameStates: [...game.gameStates, nextState],
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
