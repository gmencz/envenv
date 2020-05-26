import { gql } from '@apollo/client';

const ME = gql`
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

export { ME };
