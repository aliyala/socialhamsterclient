import React from 'react';
import { useQuery } from '@apollo/client';
import GET_USERS from '../graphql/getUsers';

const pageSize = 10;

const Users = () => {
    const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
      variables: { page: 1, pageSize }
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const loadMore = () => {
      fetchMore({
        variables: {
          page: data.users.length / 10 + 1,
          pageSize: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            users: [...prev.users, ...fetchMoreResult.users],
          };
        },
      });
    };
   // TODO: would be good to get total number of users and a flag hasNextPage. 
   
    return (
      <div>
        {data.users.map(({ id, name, email }) => (
          <div key={id}>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <br />
          </div>
        ))}
        <button disabled={data.users.length % pageSize !== 0} onClick={loadMore}>Load More</button>
      </div>
    );
};

export default Users;