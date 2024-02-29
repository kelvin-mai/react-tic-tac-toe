import express from 'express';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';

import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export const authRouter = express.Router();

authRouter.get('/user', async (_, res) => {
  if (!res.locals.session) {
    return res.status(401).end();
  }
  res
    .status(200)
    .json({
      success: true,
      session: res.locals.session,
      user: res.locals.user,
    });
});

authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await new Argon2id().hash(password);
  try {
    const existing = await db.user.findFirst({
      where: { username },
    });
    if (existing) {
      throw Error('Username already taken');
    }
    const user = await db.user.create({
      data: { id: generateId(14), username, password: hashedPassword },
    });
    const session = await auth.createSession(user.id, {});
    return res
      .appendHeader(
        'Set-Cookie',
        auth.createSessionCookie(session.id).serialize(),
      )
      .status(201)
      .json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.user.findFirst({ where: { username } });
    if (!user) {
      throw Error('Invalid username or password');
    }
    const validPassword = await new Argon2id().verify(user.password, password);
    if (!validPassword) {
      throw Error('Invalid username or password');
    }
    const session = await auth.createSession(user.id, {});
    return res
      .appendHeader(
        'Set-Cookie',
        auth.createSessionCookie(session.id).serialize(),
      )
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

authRouter.post('/logout', async (_, res) => {
  if (!res.locals.session) {
    return res.status(401).end();
  }
  await auth.invalidateSession(res.locals.session.id);
  return res
    .setHeader('Set-Cookie', auth.createBlankSessionCookie().serialize())
    .json({ success: true });
});
