import PostsDetailed from '../components/PostsDetailed';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import GET_POSTS_DETAILED from '../graphql/getPostsDetailed';

const mocks = [
  {
    request: {
      query: GET_POSTS_DETAILED,
      variables: { page: 1, pageSize: 10 },
    },
    result: {
      data: {
        posts: [
          {
            id: '123',
            title: 'My first post',
            author: { name: 'David' },
            content:
              'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data',
            comments: [
              { content: 'This is awesome post!', author: { name: 'Kate' } },
            ],
          },
        ],
      },
    },
  },
];

it('renders Posts without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PostsDetailed />
    </MockedProvider>
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('This is awesome post!')).toBeInTheDocument();
});
