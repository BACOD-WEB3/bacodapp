import useContractX from '@/hooks/useContractX';
import { notifyError } from './../components/Toast/index';
import useWallet from '@/hooks/useWallet';
import useTronContract from '@/hooks/useTronContract';
import React, { useState, useEffect } from 'react';
import ethers, { utils } from 'ethers';
import create from 'zustand';
import axios from 'axios';

export default function usePostFeed() {
  // const { contract, tronWeb } = useTronContract('feeds');
  const { contract } = useContractX('feeds');
  const { account } = useWallet();

  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [total, setTotal] = useState(0);
  const { setSelfFeeds, setAllFeeds } = useLoadFeed();
  const loadSelfFeeds = async () => {
    setLoading(true);
    const view = await contract?.balanceOf(account);
    const s_balance = parseInt(view);
    let arr = [];
    for (let i = 0; i < s_balance; i++) {
      const s_Index = await contract?.tokenOfOwnerByIndex(account, i);
      const get_uri = await contract?.tokenURI(s_Index);
      const res = await axios.get(get_uri);
      arr.push(res?.data);
    }
    setSelfFeeds(arr);

    setLoading(false);
  };
  const loadAllFeeds = async () => {
    setLoading(true);
    try {
      const supply = await contract?.totalSupply();
      const s_balance = parseInt(supply);
      const handler = s_balance - 20 < 0 ? 0 : s_balance - 20;
      let arr = [];
      for (let i = s_balance - 1; i >= handler; i--) {
        console.log(i, 'iii');
        const get_uri = await contract?.tokenURI(i);
        const res = await axios.get(get_uri);
        arr.push(res?.data);
      }
      setAllFeeds(arr);
      setLoading(false);
    } catch (error) {
      notifyError(error);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSelfFeeds();
    loadAllFeeds();
  }, [contract]);

  return {
    loading,
    contract,
    loadAllFeeds,
    // total,
  };
}

export const useLoadFeed = create((set, get) => {
  return {
    self_feeds: [],
    setSelfFeeds: async (res: string) => {
      set({ self_feeds: res });
    },
    all_feeds: [],
    setAllFeeds: async (res: string) => {
      set({ all_feeds: res });
    },
    // loading: false,
    // setLoading: async (res: boolean) => {
    //     set({ loading: res });
    //   },
  };
});
