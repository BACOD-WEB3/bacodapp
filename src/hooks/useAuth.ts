import { CONTRACTS_SETUP } from './../utils/network_config';
import { notifyError } from './../components/Toast/index';
import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAccount, useSigner, useContractRead } from 'wagmi';
import useDynamicContract from './useDynamicContract';

// goes to cache
export default function useAuth() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [isLoggedin, setLogin] = useState<any>(false);
  const [loadingProfileCheck, setLoadProfileCheck] = useState<any>(false);

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACTS_SETUP['profile'].address,
    abi: CONTRACTS_SETUP['profile'].abi,
    functionName: 'balanceOf',
    args: [address],
    chainId: CONTRACTS_SETUP.chainID,
  });

  const contract = useDynamicContract(
    CONTRACTS_SETUP['profile'].address,
    CONTRACTS_SETUP['profile'].abi,
    false,
    CONTRACTS_SETUP.rpc
  );

  const {
    setTokenID,
    loadSelfProfile,
    setCacheAddress,
    addressNOW,
    profile_cache,
  } = useProfile();

  const checkinBalanceProfile = async () => {
    console.log('check normal');

    setLoadProfileCheck(true);
    try {
      if (parseInt(data) === 1) {
        // has nft -> load profile and save it, todo: store it on localstorage
        const tokenID = await contract?.tokenOfOwnerByIndex(address, 0);
        const tokenURI = await contract?.tokenURI(parseInt(tokenID));

        setLogin(true);
        setTokenID(parseInt(tokenID));
        loadSelfProfile(tokenURI);
        setLoadProfileCheck(false);
        setCacheAddress(address);
        // then no nft do nothing
      } else if (parseInt(data) === 0) {
        setLoadProfileCheck(false);
        notifyError('You dont have any profile nft yet');
        // router.push('/auth/onboarding');
      } else {
        setLoadProfileCheck(false);
        throw Error;
      }
      // }
    } catch (error) {
      console.log('error check balance');
      setLoadProfileCheck(false);
      // throw error;
      router.push('/');
    }
  };
  const checkinBalanceProfileFORCE = async () => {
    console.log('force');
    setLoadProfileCheck(true);
    try {
      if (parseInt(data) === 1) {
        // has nft -> load profile and save it, todo: store it on localstorage
        const tokenID = await contract?.tokenOfOwnerByIndex(address, 0);
        const tokenURI = await contract?.tokenURI(parseInt(tokenID));

        setLogin(true);
        setTokenID(parseInt(tokenID));
        loadSelfProfile(tokenURI);
        setLoadProfileCheck(false);
        // then no nft do nothing
        router.push('/profile');
      } else if (parseInt(data) === 0) {
        setLoadProfileCheck(false);
        notifyError('You dont have any profile nft yet');
        router.push('/auth/onboarding');
      } else {
        setLoadProfileCheck(false);
        throw Error;
      }
      // }
    } catch (error) {
      console.log('error check balance');
      setLoadProfileCheck(false);
      // throw error;
      router.push('/');
    }
  };
  useEffect(() => {
    console.log(data, 'data');
    if (!!address && isConnected && !isError && data) {
      checkinBalanceProfile();
    }
  }, [data, isError, isLoading]);

  // force LOGGIN
  useEffect(() => {
    console.log(address, 'address', addressNOW);
    if (!!address && address !== addressNOW && !!profile_cache) {
      checkinBalanceProfileFORCE();
    }
  }, [address]);

  return {
    isLoggedin,
    loadingProfileCheck,
    checkinBalanceProfile,
    checkinBalanceProfileFORCE,
  };
}
