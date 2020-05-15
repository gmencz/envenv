import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    requestPasswordResetEmail(email: String!): Boolean!
  }

  extend type Mutation {
    signup(data: CreateUserInput!): AuthResponse!
    signupWithExternalProvider(username: String!): AuthResponse!
    automateLoginProcess: AuthResponse!
    login(username: String!, password: String!): AuthResponse!
    resetPassword(data: ResetPasswordInput): User!
  }

  input ResetPasswordInput {
    currentPassword: String!
    newPassword: String!
    token: String!
  }

  input CreateUserInput {
    id: Int
    picture: String
    username: String!
    email: String!
    name: String!
    password: String!
  }

  type AuthResponse {
    user: User!
    csrfToken: String!
  }

  type User @key(fields: "id") {
    id: Int!
    picture: String
    provider: Provider!
    username: String!
    email: String!
    name: String!
    password: String!
    role: Role!
    lastPasswordChange: String
    environments: [Int]
  }

  enum Role {
    USER
    ADMIN
  }

  enum Provider {
    GOOGLE
    NONE
  }
`;

export default typeDefs;
