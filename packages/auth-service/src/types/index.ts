import { Request, Response } from 'express';
import User from '../entities/User';

export interface ApolloContext {
  req: Request;
  res: Response;
  user: User | null;
}
