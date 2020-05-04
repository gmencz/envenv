import { Resolver, Query, Ctx } from 'type-graphql';
import { logs } from '../data';
import Log from '../entities/Log';
import { Response } from 'express';

@Resolver(() => Log)
export default class LogsResolver {
  @Query(() => Log)
  testLogs(@Ctx() { res }: { res: Response }): Log {
    return logs[0];
  }
}
