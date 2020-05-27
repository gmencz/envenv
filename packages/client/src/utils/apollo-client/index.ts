import { InMemoryCache, ApolloClient } from '@apollo/client';
import { authLink, httpLink } from './links';
import { resolvers } from './resolvers';
import { isValid } from 'shortid';
import { IS_LOGGED_IN } from '../../graphql/user/isLoggedIn';
import typeDefs from './typeDefs';

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
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
