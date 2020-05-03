import { Resolver, Query, Ctx } from 'type-graphql';
import { logs } from '../data';
import Log from '../entities/Log';
import { Request, Response } from 'express';

@Resolver(() => Log)
export default class LogsResolver {
  @Query(() => Log)
  testLogs(@Ctx() { req, res }: { req: Request; res: Response }): Log {
    console.log(req);
    res.cookie('lol', 'lmao');
    return logs[0];
  }
}
