import React, { useState, useEffect } from 'react';
import { getUserAddress, signOut } from './api/auth';
import {
  getUserData,
  updateTwitterHandle,
  updateUsername,
} from './api/profile';
import { SignInButton } from './SignInButton';

export const Profile = () => {
  const [state, setState] = useState({});
  const [username, setUsername] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
    const handler = async () => {
      const address = await getUserAddress();
      setState((x) => ({ ...x, address }));
    };
    handler();
  }, []);

  const onUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
  };

  const onTwitterHandleChange = (e) => {
    const input = e.target.value;
    setTwitterHandle(input);
  };

  useEffect(() => {
    const userDataHandler = async () => {
      const data = await getUserData();
      setUsername(data.username);
      setTwitterHandle(data.twitterHandle);
    };

    if (state.address) {
      userDataHandler();
    }
  }, [state.address]);

  if (state.error) {
    return <div>Got error while sigining the message</div>;
  }

  return (
    <div>
      {state.address ? (
        <div>
          <h1>
            {username
              ? `Hello, ${username}!`
              : `Hello, ${state.address}! Please set your username and twitter handle`}
          </h1>
          <div className="flex justify-around mt-10 mb-10">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center gap-12">
              <div className="flex flex-col gap-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={onUsernameChange}
                  value={username}
                />
                <button onClick={() => updateUsername({ username })}>
                  Update username
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="twitterHandle"
                >
                  Twitter handle
                </label>
                <input
                  type="text"
                  id="twitterHandle"
                  onChange={onTwitterHandleChange}
                  value={twitterHandle}
                />
                <button onClick={() => updateTwitterHandle({ twitterHandle })}>
                  Update twitter handle
                </button>
              </div>
            </form>
          </div>

          <button
            onClick={async () => {
              await signOut();
              setState({});
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <SignInButton
          onSuccess={({ address }) => setState((x) => ({ ...x, error: null, address }))}
          onError={({ error }) => setState((x) => ({ ...x, error }))}
        />
      )}
    </div>
  );
};
