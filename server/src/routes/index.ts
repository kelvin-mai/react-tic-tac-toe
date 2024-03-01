import express from 'express';

import { ok } from '@/utils/response';
import { authRouter } from './auth';
import { gameRouter } from './game';

export const router = express.Router();

router.get('/', async (_, res) => {
  return ok(res, {});
});

router.use(authRouter);
router.use(gameRouter);
