import { Request, Response } from 'express';

export interface GatewayService {
  name: string;
  url: string;
}

export interface GatewayContext {
  req: Request;
  res: Response;
}
