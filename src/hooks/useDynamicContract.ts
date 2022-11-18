import { Contract } from '@ethersproject/contracts';
import { useSigner } from 'wagmi';
import { useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';

export default function useDynamicContract(
  address: string,
  ABI: any,
  isMatchedNetwork?: boolean,
  providerLink: string = 'http://127.0.0.1:8545/'
) {
  const { data: signer } = useSigner();

  const _provider = new ethers.providers.StaticJsonRpcProvider(providerLink);
  return useMemo(() => {
    if (!address || !ABI) {
      return null;
    }
    try {
      return new Contract(address, ABI, isMatchedNetwork ? signer : _provider);
    } catch (error) {
      console.error('Failed To Get Contract', error);
      return null;
    }
  }, [address, isMatchedNetwork, ABI, signer]);
}
