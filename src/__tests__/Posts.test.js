import Posts from '../components/Posts';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import GET_POSTS from '../graphql/getPosts';

const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: { page: 1, pageSize: 10 },
    },
    result: {
      data: {
        posts: [
          { id: '123', title: 'My first post', author: { name: 'David' } },
        ],
      },
    },
  },
];

it('renders Posts without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Posts />
    </MockedProvider>
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('Title: My first post')).toBeInTheDocument();
});
