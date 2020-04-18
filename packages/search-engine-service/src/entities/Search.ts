import { Directive, ObjectType, Field, ID } from 'type-graphql';
import User from './User';
import { searches } from '../data';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Search {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  searchedBy: User;

  @Field(() => String)
  searchQueryString: string;

  @Field(() => Date)
  searchedAt: Date;
}

export async function resolveSearchReference(
  reference: Pick<Search, 'id'>
): Promise<Search> {
  return searches.find(search => search.id === reference.id) as Search;
}
