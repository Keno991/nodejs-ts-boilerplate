import { NextFunction, Request, Response } from 'express';

type User = { name: string };

export interface RequestWithUser extends Request {
  user?: Omit<User, 'password'>;
}

export interface RequestHandlerAuth {
  (req: RequestWithUser, res: Response, next: NextFunction): void;
}
