import { Request, Response } from 'express';

export interface GatewayContext {
  req: Request;
  res: Response;
}
