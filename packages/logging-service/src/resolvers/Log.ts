import { Resolver, Query } from 'type-graphql';
import Log from './log';
import { logs } from '../data';

@Resolver(() => Log)
export default class LogsResolver {
  @Query(() => Log)
  me(): Log {
    // @ts-ignore
    return logs[0];
  }
}
