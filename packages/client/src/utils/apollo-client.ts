import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://graphql.envenv.es/'
        : 'http://localhost:8080/graphql',
  }),
});

export { client };
