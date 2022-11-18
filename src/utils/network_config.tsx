export const TronWeb = require('tronweb');
export const HttpProvider = TronWeb.providers.HttpProvider;
import { ethers } from 'ethers';
import { Alchemy, Network } from 'alchemy-sdk';

import profileAbi from './abis/profileAbi.json';
import storeAbi from './abis/storeAbi.json';
import subsAbi from './abis/subsAbi.json';
import productAbi from './abis/productAbi.json';
import giftcodeAbi from './abis/giftcodeAbi.json';
import fakeUSDAbi from './abis/fakeUSDAbi.json';
import pointsAbi from './abis/pointsAbi.json';
import feedsAbi from './abis/feedsAbi.json';
// evm
export const CONTRACTS_SETUP = {
  chainID: 80001,
  rpc: 'https://matic-mumbai.chainstacklabs.com',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  networkName: 'Mumbai',
  network: 'MATIC',
  vendorAddress: '0xD1244aa84ad5188783721f2D142380F0F1e95088',
  profile: {
    address: '0x5d378E2B2274f9f1e53954e67Bfb76e756ed9da5',
    abi: profileAbi,
  },
  store: {
    address: '0x02DDe6B48a05bBB8035cc58f912a7334FEb67e8d',
    abi: storeAbi,
  },
  subscription: {
    address: '0x9e9cbAd21DBDCEC93a7466B1Bc00b90d1d41CB5b',
    abi: subsAbi,
  },
  product: {
    address: '0x9cb9eDfFE899105f30bBc85AB809787960a24748',
    abi: productAbi,
  },
  giftcode: {
    address: '0x1328f326675a4d5f53d954023779F170EdCd6237',
    abi: giftcodeAbi,
  },
  fakeUSD: {
    address: '0xc55bd3489B3C7216D140810D2b9cd5bd1A7858De',
    abi: fakeUSDAbi,
  },
  points: {
    address: '0x3709120C8D1DFEEE9bF8290baa1EA84b2839540c',
    abi: pointsAbi,
  },
  feeds: {
    address: '0x5A9e9520A0D4A6a17840f4953fe0a4D85A8EdeB0',
    abi: feedsAbi,
  },
};

export const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  network: Network.MATIC_MUMBAI,
});
