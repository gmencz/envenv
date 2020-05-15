import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    environments: [Environment]
  }

  type Environment @key(fields: "id") {
    id: Int!
    name: String!
    members: [EnvironmentMember]
    ownerUserId: Int
  }

  type EnvironmentMember @key(fields: "id") {
    id: Int!
    environment: Environment
    environmentRole: EnvironmentRole
    userId: Int
  }

  enum EnvironmentRole {
    ADMIN
    CONTRIBUTOR
  }
`;

export default typeDefs;
