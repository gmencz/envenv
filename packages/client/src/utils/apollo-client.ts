import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';

const authLink = setContext((_, { headers }) => {
  const csrfToken = localStorage.getItem('csrf-token');

  return {
    headers: {
      ...headers,
      ...(csrfToken && { 'csrf-token': csrfToken }),
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://graphql.envenv.es/'
          : 'http://localhost:8080/graphql',
    })
  ),
});

export { client };
