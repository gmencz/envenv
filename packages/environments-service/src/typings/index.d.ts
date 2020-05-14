import { Request, Response } from 'express';

export interface ApolloContext {
  req: Request;
  res: Response;
}
