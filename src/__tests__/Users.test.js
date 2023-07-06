import Users from '../components/Users';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import GET_USERS from '../graphql/getUsers';

const mocks = [
  {
    request: {
      query: GET_USERS,
      variables: { page: 1, pageSize: 10 },
    },
    result: {
      data: {
        users: [{ id: '123', name: 'Sam', email: 'sam@test.com' }],
      },
    },
  },
];

it('renders without error', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Users />
    </MockedProvider>
  );
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('Email: sam@test.com')).toBeInTheDocument();
});
