import { setContext } from '@apollo/link-context';
import { HttpLink } from '@apollo/client';

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
      : 'http://localhost:8080/graphql',
  credentials: 'include',
});
