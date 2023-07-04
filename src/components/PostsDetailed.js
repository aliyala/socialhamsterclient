import React from 'react';
import { useQuery } from '@apollo/client';
import GET_POSTS_DETAILED from '../graphql/getPostsDetailed';

const pageSize = 10;

const PostsDetailed = () => {
    const { loading, error, data, fetchMore } = useQuery(GET_POSTS_DETAILED, {
      variables: { page: 1, pageSize }
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
   
    const loadMore = () => {
      fetchMore({
        variables: {
          page: data.posts.length / 10 + 1,
          pageSize: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    };

    return (
    <div>
    {data.posts.map(post => (
      <div key={post.id}>
        <p>Title: {post.title}</p>
        <p>Author: {post.author.name}</p>
        <p>Content: {post.content}</p>
        <p>Comments:</p>
        <div>
          {post.comments.map(comment => (
            <div key={comment.id}>
              <p>Comment author: {comment.author.name}</p>
              <p>Comment: {comment.content}</p>
            </div>
          )
            )}
        </div>
        <br />
      </div>
    ))}
    <button disabled={data.posts.length % pageSize !== 0} onClick={loadMore}>Load More</button>
      </div>
    );
};

export default PostsDetailed;