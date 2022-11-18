import { CONTRACTS_SETUP } from './../utils/network_config';
import useWallet from '@/hooks/useWallet';
import useTronContract from '@/hooks/useTronContract';
import React, { useState, useEffect } from 'react';
import ethers, { providers, utils } from 'ethers';
import create from 'zustand';
import { useContractReads, useAccount } from 'wagmi';

export default function useOverview() {
  const [earning, setEarning] = useState(null);
  const [trx, setTrx] = useState<any>(null);
  const [usd, setUSD] = useState(null);
  const [points, setPoints] = useState(null);
  const [treasury, setTreasury] = useState(null);
  const [totalHolder, setTotalHolder] = useState(null);
  const { account } = useWallet();
  const { setInfo, setOverview } = useInfo();
  const { isConnected, address } = useAccount();

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      // total EARNINGS
      // balance NATIVE token

      {
        //usd balance
        ...CONTRACTS_SETUP.fakeUSD,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        //balance points
        ...CONTRACTS_SETUP.points,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        //treasury
        ...CONTRACTS_SETUP.fakeUSD,
        functionName: 'balanceOf',
        args: [CONTRACTS_SETUP.vendorAddress],
      },
      {
        //balance gc
        ...CONTRACTS_SETUP.giftcode,
        functionName: 'balanceOf',
        args: [address],
      },
      // total users
      {
        ...CONTRACTS_SETUP.profile,
        functionName: 'totalSupply',
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!!data && !isError) {
      setOverview({
        usd: Math.round(utils.formatEther(data?.[0])) ?? '-',
        points: Math.round(utils.formatEther(data?.[1])) ?? '-',
        treasury: Math.round(utils.formatEther(data?.[2])) ?? '-',
        giftcode: Math.round(parseInt(data?.[3])) ?? '-',
        totalHolder: parseInt(data?.[4]) ?? '-',
      });
    }
    // const loadNativeBalance = async () => {
    //   const res = providers?.getBalance(address);
    //   console.log('ss', res);

    //   const tx = new ethers.providers.StaticJsonRpcProvider(
    //     CONTRACTS_SETUP.rpc
    //   );
    //   console.log(tx, 'tx o');
    //   console.log(tx, 'ss', res);
    // };
    // console.log('bangke');
    // loadNativeBalance();
    // }, [contractUSD, contractPoints, account, tronWeb]);
  }, [data, isError]);

  return {
    earning,
    trx,
    usd,
    points,
    treasury,
    // giftcode,
    totalHolder,
    loading,
    isError,
    isLoading,
  };
}

export const useInfo = create((set, get) => {
  return {
    treasury: null,
    totalHolder: null,
    overview: null,
    setOverview: (h) => set({ overview: h }),
    setInfo: (t, h) => set({ treasury: t, totalHolder: h }),
  };
});
