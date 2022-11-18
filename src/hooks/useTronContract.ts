import { notify, notifyError } from './../components/Toast/index';
import React, { useEffect, useState } from 'react';
import ABI_PDT from '../abi/PDT.json';
import ABI_HELLO from '../abi/Hello.json';
import useWallet from './useWallet';
// TODO : VIEW
// CALL
// contract address

// FETCH USD CONTRACT, AND THE OTHERS

// 1. get TronWeb

// export const TronWeb = require('tronweb');
// export const HttpProvider = TronWeb.providers.HttpProvider;
// export let tronWeb = new TronWeb(SHASTA, SHASTA, SHASTA); //account?

const PDT = 'TDfDoua63s3Cq7hSdvFBwa6QJ62gxfRXDk'; //PDT
const helloworld = 'TXPH2MSznmhNpgTpJm821bi6k6jXzVL71C';

// fakeUSD: TMBLb5jyXxfG3hwBu18j1stEaMJ1YAvNUs
// profile: TTLPofrfvg3xxf6FKmmwmqaZn8UMkqV3hE
// product: TGizrkGndwqTiaaYx8kcLjY67hHo4bQTfU
// store:
// points:
// subscription: TGRpBpf5mHMAVYZnVynu9vXpiUYvW2SXMW

export const getContractAddress = (value) => {
  switch (value) {
    case 'points':
      return 'TXjb8zXvZpuz4iZEwjDcoCsg2cFqv9C2jy';
    case 'feeds':
      return 'TMFuYcihDk11QYJDGpB8yrDbXW6x4EAYnQ';
    case 'product':
      return 'TAQgGt2JAW3tAGC4DcVV6wHNydyHFQXd8c';
    case 'store':
      return 'TJVK9mcmMgJVGEKbsYemSSmEz2C16dQ8wa';
    case 'profile':
      return 'TTLPofrfvg3xxf6FKmmwmqaZn8UMkqV3hE';
    case 'subscription':
      return 'TGRpBpf5mHMAVYZnVynu9vXpiUYvW2SXMW';
    case 'fake-usd':
      return 'TMBLb5jyXxfG3hwBu18j1stEaMJ1YAvNUs';
  }
};
// VIEW input,
// View, Call, Free, NonPayable,
export default function useTronContract(title: string) {
  const [contract, setContract] = useState<any>(null);
  const [tronWeb, setTronWeb] = useState<any>(null);
  const { account } = useWallet();
  // const SHASTA = 'https://api.shasta.trongrid.io';
  // let tronWeb = new TronWeb(SHASTA, SHASTA, SHASTA); //account?
  const [loading, setLoading] = useState(false);

  const initWeb3 = async () => {
    try {
      if (
        typeof window?.tronLink?.tronWeb !== undefined &&
        window.tronLink?.tronWeb.ready
      ) {
        setTronWeb(window.tronLink?.tronWeb);
      }
    } catch (error) {}
  };

  const callContract = async (args, value) => {
    setLoading(true);
    tronWeb.setAddress(account);
    try {
      const tx = await contract?.[args](...value).send();
      setLoading(false);
      return tx;
    } catch (error) {
      setLoading(false);
      notifyError(error);
      throw Error(error);
    }
  };

  const initContract = async () => {
    if (!tronWeb) return null;
    try {
      // console.log(
      //   getContractAddress(title),
      //   'getContractAddress(title)',
      //   title,
      //   account
      // );

      const res = await tronWeb?.contract().at(getContractAddress(title));

      setContract(res);
      tronWeb.setAddress(account);

      // setAccount
    } catch (error) {
      console.log(error, 'error init contract', title);
    }
  };

  useEffect(() => {
    // enable web3
    // initWeb3();
    // // 2. set Contract for reuse
    // initContract();
    //  tronWeb.setAddress(myAddress);
    // -----
    // -----
    // -----
    //   let currentValue = await contract[args](type[0].value).call();
    //   setContractValue(currentValue.toString());
  }, [account, tronWeb]);

  return {
    contract,
    tronWeb,
    callContract,
    loading,
  };
}

// usage
// const contractFunction = contract.methodInstances[args].functionSelector;

// tronlink building transaction
//   const transaction =
//     await window.tronWeb.transactionBuilder.triggerSmartContract(
//       contrAdrress,
//       contractFunction,
//       options,
//       type,
//       myAddress
//     );

//   //tronlink signing transaction
//   const signedTx = await tronweb.trx.sign(transaction.transaction);
//   //tronlink broadcasting transaction
//   const broastTx = await tronweb.trx.sendRawTransaction(signedTx);
