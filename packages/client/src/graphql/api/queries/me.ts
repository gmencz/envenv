import { gql } from '@apollo/client';

export const ME = gql`
  query WhoAmI {
    me {
      name
      username
      email
      picture
      environments {
        id
        name
      }
    }
  }
`;
