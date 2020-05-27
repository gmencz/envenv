import { InMemoryCache, ApolloClient, from } from '@apollo/client';
import { authLink, httpLink, errorLink } from './links';
import { resolvers } from './resolvers';
import { isValid } from 'shortid';
import { IS_LOGGED_IN } from '../../graphql/client/queries/isUserLoggedIn';
import typeDefs from './typeDefs';

const cache = new InMemoryCache();
const link = from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  cache,
  link,
  resolvers,
  typeDefs,
});

// Initialize the cache
cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: (() => {
      const csrfToken = localStorage.getItem('csrf-token') || '';
      return isValid(csrfToken);
    })(),
  },
});
