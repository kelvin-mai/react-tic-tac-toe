import { Prisma } from '@prisma/client';
import type { Response } from 'express';

export const ok = (res: Response, payload: any) => {
  return res.status(200).json({
    success: true,
    ...payload,
  });
};

export const created = (res: Response, payload: any) => {
  return res.status(201).json({
    success: true,
    ...payload,
  });
};

export const errorResponse = (res: Response, error: unknown) => {
  console.error(error); // full error
  if (error instanceof Error) {
    console.log({
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    }); // serialized error
    if (error.cause instanceof Object && (error.cause as any)?.code) {
      return res.status((error.cause as any)?.code).json({
        success: false,
        error: error.message,
      });
    } else if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({
        success: false,
        error: 'Resource Not Found',
      });
    } else {
      return res.status(500).json({
        success: false,
        error: error.name,
      });
    }
  }
  return res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
};
