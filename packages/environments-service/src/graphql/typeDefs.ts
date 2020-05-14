import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    environments: [Environment]
  }

  type Environment @key(fields: "id") {
    id: ID!
    name: String!
    members: [User] @provides(fields: "username")
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String! @external
  }
`;

export default typeDefs;
