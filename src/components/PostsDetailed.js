import React from 'react';
import { useQuery } from '@apollo/client';
import GET_POSTS_DETAILED from '../graphql/getPostsDetailed';

const pageSize = 10;

const PostsDetailed = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS_DETAILED, {
    variables: { page: 1, pageSize },
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
    <div className="container">
      {data.posts.map(post => (
        <div key={post.id} className="item">
          <p className="bold-text">Title: {post.title}</p>
          <p className="secondary-text">Author: {post.author.name}</p>
          <p>Content: {post.content}</p>
          <p>Comments:</p>
          <div className="comment-container">
            {post.comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <span className="bold-text">{comment.author.name}: </span>
                <span className="comment-content">{comment.content}</span>
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
      <button
        className="load-more-btn"
        disabled={data.posts.length % pageSize !== 0}
        onClick={loadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default PostsDetailed;
