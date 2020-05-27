import { gql } from '@apollo/client';

export const LOGOUT = gql`
  mutation Logout {
    logout {
      __typename
      ... on NoCurrentSession {
        message
      }
      ... on SuccessfulLogout {
        performedAt
      }
    }
  }
`;
