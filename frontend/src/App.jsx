import React from 'react';
import './App.css';
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { Profile } from './Profile';
import { ConnectWallet } from './ConnectWallet';

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
});

const App = () => (
  <WagmiConfig client={client}>
    <ConnectWallet>
      <Profile />
    </ConnectWallet>
  </WagmiConfig>
);

export default App;
