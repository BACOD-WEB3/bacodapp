import { notifyError, notifySuccess } from './../components/Toast/index';
import { CONTRACTS_SETUP } from './../utils/network_config';
import React, { useState, useEffect } from 'react';
import useDynamicContract from './useDynamicContract';
import { useSwitchNetwork, useNetwork } from 'wagmi';

export default function useContractX(contractType = '') {
  const [loading, setLoading] = useState(false);
  const contract = useDynamicContract(
    CONTRACTS_SETUP[contractType]?.address,
    CONTRACTS_SETUP[contractType]?.abi,
    true,
    CONTRACTS_SETUP.rpc
  );

  const { chains, switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const callContract = async (method = '', args = []) => {
    if (chain?.id !== CONTRACTS_SETUP.chainID) {
      switchNetwork(CONTRACTS_SETUP.chainID);
    }

    console.log(method, args);
    setLoading(true);
    let res;
    try {
      const tx = await contract[method](...args, {
        gasLimit: 3000000,
      });

      res = await tx.wait();
      notifySuccess(`Success transaction...`);
      console.log(res);
      setLoading(false);
      return res;
    } catch (error) {
      console.log(error);
      notifyError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chain?.id !== CONTRACTS_SETUP.chainID) {
      switchNetwork(CONTRACTS_SETUP.chainID);
    }
  }, [chain]);

  return {
    contract,
    callContract,
  };
}
