import { Request, Response } from 'express';
import { ASTNode } from 'graphql';

export interface ApolloContext {
  req: Request;
  res: Response;
}

export interface InfoParameter {
  operation: ASTNode;
}
