import { gql } from '@apollo/client';
import USER_MAIN_INFO from './userMainInfo';

const GET_USERS = gql`
  ${USER_MAIN_INFO}
  query GetUsers($page: Int, $pageSize: Int) {
    users(page: $page, pageSize: $pageSize) {
      ...UserMainInfo
      email
    }
  }
`;

export default GET_USERS;