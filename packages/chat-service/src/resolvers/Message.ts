import { Resolver, Query } from 'type-graphql';
import Message from '../entities/Message';
import { messages } from '../data';

@Resolver(() => Message)
export default class MessageResolver {
  @Query(() => [Message])
  messages(): Message[] {
    return [...messages];
  }
}
