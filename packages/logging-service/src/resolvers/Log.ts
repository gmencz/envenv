import { Resolver, Query, Ctx } from 'type-graphql';
import { logs } from '../data';
import Log from '../entities/Log';
import { Response } from 'express';

@Resolver(() => Log)
export default class LogsResolver {
  @Query(() => Log)
  testLogs(@Ctx() { res }: { res: Response }): Log {
    res.cookie('al', 'la', {
      domain: '',
      expires: new Date('2021'),
      httpOnly: true,
      maxAge: 360000,
      path: '/pp',
      sameSite: true,
      secure: true,
    });
    return logs[0];
  }
}
