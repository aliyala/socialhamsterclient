import { gql } from '@apollo/client';

const USER_MAIN_INFO = gql`
  fragment UserMainInfo on User {
    id
    name
  }
`;

export default USER_MAIN_INFO;
