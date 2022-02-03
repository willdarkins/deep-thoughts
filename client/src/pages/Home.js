import React from 'react';
// importing the useQuery Hook from Apollo Client
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {

  // use useQuery hook to make query request
  // Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet.
  // When it's finished and we have data returned from the server
  // that information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  /*What we're saying is, if data exists, store it in the thoughts constant we just created.
  If data is undefined, then save an empty array to the thoughts component*/

  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{/* PRINT THOUGHT LIST */}</div>
      </div>
    </main>
  );
};

export default Home;
