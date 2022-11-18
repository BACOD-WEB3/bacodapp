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
  const { setChildx, setLevel, setGraph } = useZustandPostion();

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
    const COLOR_NUMBER = 5;
    const nodes = [{ id: address, group: COLOR_NUMBER }];
    const links = [
      // { id: address, group: 4 }
    ];

    for (let i = 0; i < arr?.length; i++) {
      nodes.push({ id: arr[i], group: COLOR_NUMBER });
      links.push({
        source: arr[i],
        target: address,
        value: 1,
      });

      const resI = await contract?.getChilds(arr[i]);
      level2 += resI?.length;
      //
      for (let j = 0; j < resI?.length; j++) {
        const resJ = await contract?.getChilds(resI[j]);
        level3 += resJ?.length;

        nodes.push({ id: resI[j], group: COLOR_NUMBER });
        links.push({
          target: arr[i],
          source: resI[j],
          value: 1,
        });
        //
        for (let k = 0; k < resJ?.length; k++) {
          // const resK = await contract?.getChilds(resJ[k]);

          nodes.push({ id: resJ[k], group: COLOR_NUMBER });
          links.push({
            target: resI[j],
            source: resJ[k],
            value: 1,
          });
        }
      }
    }
    setLevel([arr?.length, level2, level3]);
    setGraph(nodes, links);
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
    nodes: [],
    links: [],
    setGraph: async (res, x) => {
      set({ nodes: res, links: x });
    },
    setChildx: async (res: string) => {
      set({ child: res });
    },
    setLevel: async (res: any) => {
      set({ levels: res });
    },
  };
});
