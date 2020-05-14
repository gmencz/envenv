import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    picture: String!
    provider: String!
    username: String!
    email: String!
    name: String!
    password: String!
    role: String!
    lastPasswordChange: String
  }
`;

export default typeDefs;
