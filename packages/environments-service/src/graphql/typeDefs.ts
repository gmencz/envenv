import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    environments: [Environment]
  }

  type Environment @key(fields: "id") {
    id: ID!
    name: String!
    members: [EnvironmentMember]
    owner: User! @provides(fields: "id username")
  }

  type EnvironmentMember @key(fields: "id") {
    id: ID!
    environment: Environment
    environmentRole: EnvironmentRole
    user: User! @provides(fields: "id username")
  }

  enum EnvironmentRole {
    ADMIN
    CONTRIBUTOR
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String! @external
    environments: [Environment]
  }
`;

export default typeDefs;
