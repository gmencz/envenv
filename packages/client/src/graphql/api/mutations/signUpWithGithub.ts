import { gql } from '@apollo/client';

export const SIGNUP_WITH_GITHUB = gql`
  mutation SignUpWithGithub($data: CreateUserInput!) {
    signup(data: $data, provider: GITHUB) {
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
