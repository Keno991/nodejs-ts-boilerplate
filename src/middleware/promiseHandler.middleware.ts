import type { NextFunction, Request, Response } from 'express';

import type { RequestWithUser } from '@interfaces/auth.interface';

type FnType = (
  req: Request | RequestWithUser,
  res: Response,
  next: NextFunction
) => void;

export const promiseHandler =
  (fn: FnType) =>
  async (req: Request | RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
