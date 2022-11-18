import { CONTRACTS_SETUP } from '@/utils/network_config';
import { configureChains, createClient, defaultChains, Chain } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const customChain: Chain = {
  id: CONTRACTS_SETUP.chainID,
  name: CONTRACTS_SETUP.networkName,
  network: CONTRACTS_SETUP.network,
  rpcUrls: { default: CONTRACTS_SETUP.rpc },
  nativeCurrency: {
    decimals: 18,
    name: CONTRACTS_SETUP.network,
    symbol: CONTRACTS_SETUP.network,
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: true,
};
const chains = [customChain];
const { provider, webSocketProvider } = configureChains(
  [customChain],
  [publicProvider()],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== customChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
