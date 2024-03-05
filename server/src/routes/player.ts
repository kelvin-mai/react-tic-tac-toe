import express from 'express';

import { db, gameWithCurrentState } from '@/lib/db';
import { ok, errorResponse } from '@/utils/response';
import { NOT_FOUND } from '@/utils/errors';

export const playerRouter = express.Router();

playerRouter.route('/player/top').get(async (_, res) => {
  try {
    const players = await db.user.findMany({
      include: {
        _count: {
          select: {
            gamesWon: true,
          },
        },
      },
      orderBy: {
        gamesWon: {
          _count: 'desc',
        },
      },
      take: 5,
    });
    return ok(res, {
      players: players.map((p) => {
        const { password: _, ...player } = p;
        return player;
      }),
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});

playerRouter.route('/player/:id').get(async (req, res) => {
  const pageSize = parseInt((req.query.pagesize as string) || '10');
  const page = parseInt((req.query.page as string) || '1');
  try {
    const user = await db.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      throw NOT_FOUND;
    }
    const where = {
      AND: [
        { OR: [{ playerXId: req.params.id }, { playerOId: req.params.id }] },
        { gameStates: { some: { status: 'win' } } },
        { gameStates: { some: { status: 'ongoing' } } },
      ],
    };
    const games = await db.game.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
      where,
      include: {
        gameStates: true,
        playerO: true,
        playerX: true,
      },
    });
    const total = await db.game.count({ where });
    const { password: _, ...player } = user;
    return ok(res, {
      player: player,
      games: games.map((g) => gameWithCurrentState(g)),
      pagination: {
        page,
        pageSize,
        total,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
});
