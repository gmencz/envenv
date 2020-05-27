import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation SignUp($data: CreateUserInput!) {
    signup(data: $data) {
      __typename
      ... on SuccessfulSignup {
        csrfToken
      }
      ... on InvalidDataFormat {
        message
      }
      ... on TakenUsernameOrEmail {
        message
      }
    }
  }
`;
