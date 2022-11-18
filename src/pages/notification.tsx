import Distribution from '@/components/Distribution';
import Layout from '@/components/Layout';
import useTxEvents from '@/hooks/useTxEvents';
import { CONTRACTS_SETUP } from '@/utils/network_config';
import Head from 'next/head';
import Image from 'next/image';
import { useContractEvent } from 'wagmi';

export default function Notification() {
  const { loading, allTx } = useTxEvents();

  useContractEvent({
    address: CONTRACTS_SETUP.store.address,
    abi: CONTRACTS_SETUP.store.abi,
    eventName: 'Distributed',
    listener(node, label, owner) {
      console.log(node, label, owner, 'HALA');
    },
    chainId: CONTRACTS_SETUP.chainID,
  });
  return (
    <Layout
      rightMenu={
        <div>
          <Distribution isGraph={false} />
        </div>
      }
    >
      {loading && <div className='text-orange-600'>Loading...</div>}
      {allTx.map((item, i) => (
        <div
          // onClick={() => }
          key={i}
          className='m-2 rounded-md border p-4'
        >
          {item?.description}
        </div>
      ))}
    </Layout>
  );
}
