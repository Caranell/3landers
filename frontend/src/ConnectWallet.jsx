import React from 'react';
import {
  useAccount,
  useConnect,
} from 'wagmi';

export const ConnectWallet = ({ children }) => {
  const { isConnected } = useAccount();
  const {
    connect, connectors, error, isLoading, pendingConnector,
  } = useConnect();

  return isConnected ? (
    <div>
      { children }
    </div>
  ) : (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading
              && connector.id === pendingConnector?.id
              && ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};
