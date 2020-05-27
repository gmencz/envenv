import { ApolloCache, Resolvers } from '@apollo/client';
import { IS_LOGGED_IN } from '../../graphql/client/queries/isUserLoggedIn';

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Mutation: ResolverMap;
}

export const resolvers: AppResolvers = {
  Mutation: {
    logoutClient: (_parent, _args, { cache }) => {
      cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: false },
      });
      localStorage.removeItem('csrf-token');

      return true;
    },
    loginClient: (_parent, { csrfToken }, { cache }) => {
      localStorage.setItem('csrf-token', csrfToken);
      cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      });
    },
  },
};
