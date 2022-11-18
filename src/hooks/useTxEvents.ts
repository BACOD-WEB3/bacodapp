import { alchemy, CONTRACTS_SETUP } from '@/utils/network_config';
import { notifyError } from './../components/Toast/index';
import useWallet from '@/hooks/useWallet';
import useTronContract, { getContractAddress } from '@/hooks/useTronContract';
import React, { useEffect, useState } from 'react';
import { useContractEvent, useAccount } from 'wagmi';
import { ethers, utils } from 'ethers';

export default function useTxEvents() {
  const { tronWeb } = useTronContract('store');
  //   const { account } = useWallet();
  const [allTx, setAllTx] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalEarning, setEarning] = useState<number | null>(null);
  // const x = useContractEvent({
  //   address: CONTRACTS_SETUP.store.address,
  //   abi: CONTRACTS_SETUP.store.abi,
  //   eventName: 'Distributed',
  //   listener(node, label, owner) {
  //     console.log(node, label, owner, 'HALA');
  //   },
  //   chainId: CONTRACTS_SETUP.chainID,
  // });
  const { address } = useAccount();

  useEffect(() => {
    const loadData = async () => {
      console.log(address, 'addres');
      if (!address) return;
      setLoading(true);
      const encodedWallet = utils.hexlify(
        utils.zeroPad(utils.arrayify(address), 32)
      );
      const earnEvent = utils.id('Distributed(address,address,uint256)');

      try {
        const earnTransactions = await alchemy.core.getLogs({
          address: CONTRACTS_SETUP.store.address,
          fromBlock: 'earliest',
          toBlock: 'latest',
          topics: [earnEvent, null, encodedWallet],
        });
        let totalEarnings = 0;
        let transactions = [];
        console.log(earnTransactions, 'earnTransactions');
        for (let i = 0; i < earnTransactions.length; i++) {
          const earn = Number(utils.formatUnits(earnTransactions[i].data));
          totalEarnings += earn;
          const earner = utils.hexStripZeros(earnTransactions[i].topics[1]);
          transactions.push({
            description: `Received ${earn.toString()} T-USD from user (${earner.substring(
              0,
              4
            )}...${earner.substring(38)})`,
            type: 'Incoming',
            amount: earn,
            hash: earnTransactions[i].transactionHash,
            currency: 'T-USD',
            blockNumber: earnTransactions[i].blockNumber,
            id: i,
          });
        }
        setAllTx(transactions);
        console.log();
        setEarning(totalEarnings);
        // const res = await tronWeb?.getEventResult(getContractAddress('store'), {
        //   eventName: 'Distributed',
        //   onlyConfirmed: true,
        // });
        // if (typeof tronWeb !== undefined) {
        //   const expectedFormat = tronWeb?.defaultAddress.hex?.substring(2);
        //   const plus0x = '0x' + expectedFormat.toLowerCase();

        //   const filtered = res.filter((k) => k.result?.to === plus0x);
        //   setAllTx(filtered);
        //   //   calculate total
        //   let total = 0;
        //   res.filter((k) => {
        //     if (k.result?.to === plus0x) {
        //       total += k.result?.amount / 1000000000000000000;
        //     }
        //   });
        //   setEarning(total);
        // }
        setLoading(false);
      } catch (error) {
        console.log(error, 'error');
        setLoading(false);
        notifyError(error);
      }
    };
    loadData();
  }, [address]);

  return {
    allTx,
    loading,
    totalEarning,
  };
}
