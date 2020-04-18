import { Resolver, Query } from 'type-graphql';
import { logs } from '../data';
import Log from '../entities/Log';

@Resolver(() => Log)
export default class LogsResolver {
  @Query(() => Log)
  me(): Log {
    return logs[0];
  }
}
