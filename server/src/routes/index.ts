import express from 'express';

import { authRouter } from './auth';

export const router = express.Router();

router.get('/', async (_, res) => {
  return res.status(200).json({ ok: true });
});

router.use(authRouter);
