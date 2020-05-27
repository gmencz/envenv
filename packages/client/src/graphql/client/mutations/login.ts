import { gql } from '@apollo/client';

export const LOGIN_ON_CLIENT = gql`
  mutation LoginOnClient($csrfToken: String!) {
    loginClient(csrfToken: $csrfToken) @client
  }
`;
