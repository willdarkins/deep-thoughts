import React from 'react';
// importing the useQuery Hook from Apollo Client
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';

const Home = () => {

  // use useQuery hook to make query request
  // Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet.
  // When it's finished and we have data returned from the server
  // that information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  /*What we're saying is, if data exists, store it in the thoughts constant we just created.
  If data is undefined, then save an empty array to the thoughts component*/

  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
      {loggedIn && userData ? (
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
          />
        </div>
      ) : null}
    </main>
  );
};

export default Home;
