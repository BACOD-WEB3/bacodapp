import { tronWeb } from './useTronContract';
import { notifyError } from './../components/Toast/index';
import React, { useEffect, useState } from 'react';

//network handler
// let tronweb = window?.tronWeb;

// todo:
// - change wallet
// - change network - shasnet
// - auth => directly checkin NFT

export default function useWallet() {
  const [account, setAccount] = useState<any>(null);
  const [tronWeb, setTronWeb] = useState<any>(null);
  const fetchAddressfromTronlink = async () => {};

  useEffect(() => {}, []);

  return {
    account,
    tronWeb,
    fetchAddressfromTronlink,
  };
}
