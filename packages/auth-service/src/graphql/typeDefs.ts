import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    helloAuth: String!
  }
`;

export default typeDefs;
