import express from 'express';

import { db } from '@/lib/db';
import { ok, errorResponse } from '@/utils/response';

export const playerRouter = express.Router();

playerRouter.route('/player').get(async (_, res) => {
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
    ok(res, { players });
  } catch (error) {
    return errorResponse(res, error);
  }
});
