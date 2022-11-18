import useWallet from '@/hooks/useWallet';
import useTronContract from '@/hooks/useTronContract';
import React, { useState, useEffect } from 'react';
import ethers, { utils } from 'ethers';
import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export default function useGiftCodes() {
  const { contract, tronWeb } = useTronContract('product');
  const { account } = useWallet();

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { setGC } = useGC();
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await contract?.balanceOf(account).call();
      console.log(res, 'gc');
      setTotal(parseInt(res));
      setGC(parseInt(res));
      //

      setLoading(false);
    };
    loadData();
  }, [contract]);

  return {
    loading,
    total,
  };
}

export const useGC = create((set, get) => {
  return {
    gc: null,
    setGC: (t, h) => {
      set({ gc: t });
    },
  };
});
