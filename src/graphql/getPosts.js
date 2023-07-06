import { gql } from '@apollo/client';
import USER_MAIN_INFO from './userMainInfo';

const GET_POSTS = gql`
  ${USER_MAIN_INFO}
  query GetPosts($page: Int, $pageSize: Int) {
    posts(page: $page, pageSize: $pageSize) {
      id
      title
      author {
        ...UserMainInfo
      }
    }
  }
`;

export default GET_POSTS;
