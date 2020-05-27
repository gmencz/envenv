import { gql } from '@apollo/client';

export const LOGOUT_ON_CLIENT = gql`
  mutation LogoutOnClient {
    logoutClient @client
  }
`;
