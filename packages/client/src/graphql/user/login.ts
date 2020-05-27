import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
      ... on SuccessfulLogin {
        csrfToken
      }
      ... on InvalidCredentials {
        message
      }
      ... on InvalidDataFormat {
        message
      }
    }
  }
`;
