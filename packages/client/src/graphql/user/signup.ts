import { gql } from '@apollo/client';

const SIGNUP = gql`
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

export { SIGNUP };
