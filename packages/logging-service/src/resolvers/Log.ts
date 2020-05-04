import { Resolver, Query, Ctx } from 'type-graphql';
import { logs } from '../data';
import Log from '../entities/Log';
import { Request, Response } from 'express';

@Resolver(() => Log)
export default class LogsResolver {
  @Query(() => Log)
  testLogs(@Ctx() { req, res }: { req: Request; res: Response }): Log {
    res.cookie('lol', 'lmao', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
      maxAge: 3000000,
      domain: '',
      sameSite: true,
    });
    res.cookie('lol2', 'lmao2');
    return logs[0];
  }
}
