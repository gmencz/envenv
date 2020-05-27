import { gql } from '@apollo/client';

const typeDefs = gql`
  extend type Query {
    "Find out if the user is logged in or not."
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    "Logout user on the client, clears csrf-token from localStorage."
    logoutClient: Boolean!

    "Login user on the client, saves the csrf-token received from the server to localStorage."
    loginClient(csrfToken: String!): Boolean!
  }
`;

export default typeDefs;
