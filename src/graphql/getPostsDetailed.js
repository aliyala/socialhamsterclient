import { gql } from "@apollo/client";
import USER_MAIN_INFO from "./userMainInfo";

const GET_POSTS_DETAILED = gql`
  ${USER_MAIN_INFO}
  query GetPostsDetailed($page: Int, $pageSize: Int) {
    posts(page: $page, pageSize: $pageSize) {
      id
      title
      content
      author
        {
          ...UserMainInfo
        }
      comments
      {
        id
        content
        author {
          ...UserMainInfo
        }
      }
    }
  }
`;

export default GET_POSTS_DETAILED;