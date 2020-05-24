import UserResolvers from './user';
import MutationResolvers from './mutation';
import QueryResolvers from './query';
import { Resolvers } from '../generated';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';

const resolvers: Resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  User: UserResolvers,
};

export default resolvers;
