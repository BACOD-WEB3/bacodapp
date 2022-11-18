import { CONTRACTS_SETUP } from '@/utils/network_config';
import { notifyError } from './../components/Toast/index';
import useWallet from '@/hooks/useWallet';
import useTronContract, { getContractAddress } from '@/hooks/useTronContract';
import React, { useEffect, useState } from 'react';
import { useContractEvent } from 'wagmi';

export default function useTxEvents() {
  const { tronWeb } = useTronContract('store');
  //   const { account } = useWallet();
  const [allTx, setAllTx] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalEarning, setEarning] = useState<number | null>(null);
  const x = useContractEvent({
    address: CONTRACTS_SETUP.store.address,
    abi: CONTRACTS_SETUP.store.abi,
    eventName: 'Distributed',
    listener(node, label, owner) {
      console.log(node, label, owner, 'HALA');
    },
    chainId: CONTRACTS_SETUP.chainID,
  });

  console.log(x, 'x');

  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await tronWeb?.getEventResult(getContractAddress('store'), {
  //         eventName: 'Distributed',
  //         onlyConfirmed: true,
  //       });
  //       if (typeof tronWeb !== undefined) {
  //         const expectedFormat = tronWeb?.defaultAddress.hex?.substring(2);
  //         const plus0x = '0x' + expectedFormat.toLowerCase();

  //         const filtered = res.filter((k) => k.result?.to === plus0x);
  //         setAllTx(filtered);
  //         //   calculate total
  //         let total = 0;
  //         res.filter((k) => {
  //           if (k.result?.to === plus0x) {
  //             total += k.result?.amount / 1000000000000000000;
  //           }
  //         });
  //         setEarning(total);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error, 'error');
  //       setLoading(false);
  //       notifyError(error);
  //     }
  //   };
  // }, [tronWeb]);

  return {
    allTx,
    loading,
    tronWeb,
    totalEarning,
  };
}
