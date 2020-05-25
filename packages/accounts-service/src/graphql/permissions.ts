import { rule, shield } from 'graphql-shield';
import { ApolloContext } from '../typings';

const isAuthenticated = rule()((_, __, { auth }: ApolloContext) => {
  return auth.isAuthenticated;
});

const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
});

export default permissions;
