import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import type { Request, Response, NextFunction } from 'express';
import type { Session, User } from '@prisma/client';

import { db } from './db';

import { webcrypto } from 'crypto';
globalThis.crypto = webcrypto;

const adapter = new PrismaAdapter(db.session, db.user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionId = auth.readSessionCookie(req.headers.cookie ?? '');
  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
  }
  const { session, user } = await auth.validateSession(sessionId);
  if (session && session.fresh) {
    res.appendHeader(
      'Set-Cookie',
      auth.createSessionCookie(session.id).serialize(),
    );
  }
  if (!session) {
    res.appendHeader('Set-Cookie', auth.createBlankSessionCookie().serialize());
  }
  res.locals.session = session;
  res.locals.user = user;
  return next();
};

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: Omit<User, 'id'>;
  }
}

declare global {
  namespace Express {
    interface Locals {
      user: Omit<User, 'password'> | null;
      session: Session | null;
    }
  }
}
