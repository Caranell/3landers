import React, { useState, useEffect } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { api } from '../lib/axios';
import { SignInButton } from './SignInButton';

export const Profile = () => {
  const { isConnected } = useAccount();

  const [state, setState] = useState({});
  const { data: ensName } = useEnsName({ address: state.address });

  useEffect(() => {
    const handler = async () => {
      const { address } = await api.get('/auth/session');
      setState((x) => ({ ...x, address }));
    };
    handler();
  }, []);

  if (isConnected) {
    return (
      <div>
        {state.address ? (
          <div>
            <div>{ensName ? `${ensName} (${state.address})` : state.address}</div>
            <button
              onClick={async () => {
                await api.post('/auth/sign-out');
                setState({});
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <SignInButton
            onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
            onError={({ error }) => setState((x) => ({ ...x, error }))}
          />
        )}
      </div>
    );
  }

  return <div>asdfasdf</div>;
};
