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
  const { setChildx, setLevel } = useZustandPostion();

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACTS_SETUP['profile'].address,
    abi: CONTRACTS_SETUP['profile'].abi,
    functionName: 'getChilds',
    args: [address],
    chainId: CONTRACTS_SETUP.chainID,
  });

  const _recursivePosition = async (arr = []) => {
    // change to recursive later for allgraphs
    // stop on depth 3 level
    //  level1
    // levl2
    // level3
    let level2 = 0;
    let level3 = 0;

    for (let i = 0; i < arr?.length; i++) {
      const resI = await contract?.getChilds(arr[i]);
      level2 += resI?.length;

      for (let j = 0; j < resI?.length; j++) {
        const resJ = await contract?.getChilds(resI[j]);
        level3 += resJ?.length;

        // for (let k = 0; k < resJ?.length; k++) {
        //   const resk = await contract?.getChilds(resJ[k]);
        //   console.log(resk, '`3', resJ[k]);
        // }
        // const res = await contract?.getChilds(resI[j]);
      }
    }
    setLevel([arr?.length, level2, level3]);
  };
  useEffect(() => {
    if (!!address && !isError && data) {
      // console.log(data, 'data', data.length);
      setChildx(data);
      setChild(data);
      _recursivePosition(data);
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
    levels: [],
    setChildx: async (res: string) => {
      set({ child: res });
    },
    setLevel: async (res: any) => {
      set({ levels: res });
    },
  };
});
