import useAuth from '@/hooks/useAuth';
import useOverview, { useInfo } from '@/hooks/useOverview';
import useWallet from '@/hooks/useWallet';
import { CONTRACTS_SETUP } from '@/utils/network_config';
import { useRouter } from 'next/router';
import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { notify } from '../Toast';

export default function Navbar({ isFixed = false }) {
  const { chain } = useNetwork();
  return (
    <div
      className={`${
        isFixed && 'fixed'
      } z-30 flex w-full max-w-screen-xl justify-between self-center  bg-transparent py-4 `}
    >
      <b className='ts-m text-red- text-lg'>ShuoCIAL</b>
      <div className='flex justify-center align-middle text-sm'>
        <div
          className={`mr-3 h-3 w-3  rounded-full border ${
            chain?.id === CONTRACTS_SETUP.chainID
              ? 'bg-green-400'
              : 'bg-red-400'
          }`}
        />
        <div>{CONTRACTS_SETUP.networkName} Network</div>
      </div>
      <AccountButton />
    </div>
  );
}

const AccountButton = () => {
  const { account, fetchAddressfromTronlink } = useWallet();
  const { isConnected, address } = useAccount();

  const router = useRouter();
  if (address) {
    return (
      <div className='flex space-x-2'>
        <AppInfo />
        <div>{address.substring(0, 10)}...</div>
      </div>
    );
  } else {
    return (
      <button
        className='cursor-pointer text-orange-600'
        onClick={() => {
          notify('todo');
          // fetchAddressfromTronlink();
        }}
      >
        connect wallet
      </button>
    );
  }
};

const AppInfo = () => {
  const { totalHolder, treasury, overview } = useInfo();

  return (
    <div>
      Treasury:{' '}
      <b className='text-green-400'>{overview?.treasury ?? '-'} USD</b>{' '}
      &nbsp;&nbsp; Total Users:{' '}
      <b className='text-yellow-400'>{overview?.totalHolder ?? '-'}</b>{' '}
      &nbsp;&nbsp;
    </div>
  );
};
