import { setContext } from '@apollo/link-context';
import { HttpLink } from '@apollo/client';
import { onError } from '@apollo/link-error';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
});

export const authLink = setContext((_, { headers }) => {
  const csrfToken = localStorage.getItem('csrf-token');

  return {
    headers: {
      ...headers,
      ...(csrfToken && { 'csrf-token': csrfToken }),
    },
  };
});

export const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://graphql.envenv.es/'
      : 'http://localhost:7000/graphql',
  credentials: 'include',
});
