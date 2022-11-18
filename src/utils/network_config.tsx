export const TronWeb = require('tronweb');
export const HttpProvider = TronWeb.providers.HttpProvider;

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
  chainID: 1029,
  rpc: 'https://pre-rpc.bt.io/',
  networkName: 'BTT tesnet',
  icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16086.png',
  network: 'BTT',
  vendorAddress: '0xD1244aa84ad5188783721f2D142380F0F1e95088',
  profile: {
    address: '0x49018e9a5b4127Ab30D404318e22700427f100bc',
    abi: profileAbi,
  },
  store: {
    address: '0x4fda35CF2eccbe26033c4e2dD0D0cDD7B620c396',
    abi: storeAbi,
  },
  subscription: {
    address: '0xC5884405F13537aD381838cbaf9e96a1989A87dB',
    abi: subsAbi,
  },
  product: {
    address: '0xf5E05A8832efd7f20aF3165A10613D37299AFDe2',
    abi: productAbi,
  },
  giftcode: {
    address: '0xf5E05A8832efd7f20aF3165A10613D37299AFDe2',
    abi: giftcodeAbi,
  },
  fakeUSD: {
    address: '0x4208D429D75712532dD514eA599996EAb6Fd0C2C',
    abi: fakeUSDAbi,
  },
  points: {
    address: '0xE5922D2623c35EDC4a8Dd2D8FCd77c60042FcfBd',
    abi: pointsAbi,
  },
  feeds: {
    address: '0x1623B5d823c050d1E0B29c549BACe8f0371e65F0',
    abi: feedsAbi,
  },
};
