import { CONTRACTS_SETUP } from '@/utils/network_config';
import { useAccount, useContractRead } from 'wagmi';
import useContractX from '@/hooks/useContractX';
import { notifyError } from './../components/Toast/index';
import React, { useEffect, useState } from 'react';
import create from 'zustand';

export default function usePosition() {
  const [child, setChild] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contract } = useContractX('profile');
  const { address } = useAccount();
  const { setChildx } = useZustandPostion();

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACTS_SETUP['profile'].address,
    abi: CONTRACTS_SETUP['profile'].abi,
    functionName: 'getChilds',
    args: [address],
    chainId: CONTRACTS_SETUP.chainID,
  });
  useEffect(() => {
    if (!!address && !isError && data) {
      // console.log(data, 'data', data.length);
      setChildx(data);
      setChild(data);
    }
  }, [data, address, isError]);
  return {
    child,
    loading,
  };
}

export const useZustandPostion = create((set, get) => {
  return {
    childx: [],
    setChildx: async (res: string) => {
      set({ child: res });
    },
  };
});
