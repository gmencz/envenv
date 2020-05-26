import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { isValid } from 'shortid';

const authLink = setContext((_, { headers }) => {
  const csrfToken = localStorage.getItem('csrf-token');

  return {
    headers: {
      ...headers,
      ...(csrfToken && { 'csrf-token': csrfToken }),
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: authLink.concat(
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://graphql.envenv.es/'
          : 'http://localhost:8080/graphql',
      credentials: 'include',
    })
  ),
});

async function writeInitialData() {
  cache.writeQuery({
    query: gql`
      query GetLoggedInStatus {
        isLoggedIn
      }
    `,
    data: {
      isLoggedIn: (() => {
        const csrfToken = localStorage.getItem('csrf-token') || '';
        return isValid(csrfToken);
      })(),
    },
  });
}

writeInitialData();

client.onResetStore(writeInitialData);

export { client };
