import useOverview, { useInfo } from '@/hooks/useOverview';
import useTxEvents from '@/hooks/useTxEvents';
import { CONTRACTS_SETUP } from '@/utils/network_config';
import React from 'react';
import { useAccount, useBalance } from 'wagmi';
const OVERVIEW = [
  {
    title: 'TOTAL EARNINGS',
    symbol: 'TUSD',
    icon: (
      <img
        alt=''
        src='https://s2.coinmarketcap.com/static/img/coins/64x64/20317.png'
        className='h-12 w-12 rounded-full border'
      />
    ),
    bg: 'bg-gradient-to-r from-green-500 to-blue-300',
  },
  {
    title: 'NETWORK BALANCE',
    symbol: CONTRACTS_SETUP.network,
    bg: 'bg-gradient-to-r from-cyan-500 to-blue-500',

    icon: (
      <img
        alt=''
        src={CONTRACTS_SETUP.icon}
        className='h-12 w-12 rounded-full border'
      />
    ),
  },
  {
    title: 'TUSD BALANCE',
    symbol: 'TUSD',
    icon: (
      <img
        alt=''
        src='https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png'
        className='h-12 w-12 rounded-full border'
      />
    ),
    bg: 'bg-gradient-to-r from-pink-600 to-red-500',
  },
  {
    title: 'SHUO-COIN',
    value: '-',
    symbol: 'SHUO',
    icon: <div className='h-12 w-12 rounded-full border bg-red-900' />,

    bg: 'bg-gradient-to-r from-orange-500 to-sky-500',
  },
  {
    title: 'POINTS',
    symbol: 'POINTS',
    icon: (
      <img
        alt=''
        src='https://s2.coinmarketcap.com/static/img/coins/64x64/21848.png'
        className='h-12 w-12 rounded-full border'
      />
    ),

    bg: 'bg-gradient-to-r from-purple-500 to-beige-500',
  },
];
export default function Overview() {
  const { trx, usd, points, loading } = useOverview();
  const { overview } = useInfo();
  const { totalEarning } = useTxEvents();
  const { address } = useAccount();
  const balance = useBalance({
    address,
  });

  const arrOverview = [
    totalEarning,
    balance?.data?.formatted,
    overview?.usd,
    '-',
    overview?.points,
  ];

  return (
    <div className='px-2'>
      {OVERVIEW.map((item, i) => (
        <OverviewItem
          key={i}
          {...{
            ...item,
            loading,
            value: arrOverview[i],
          }}
        />
      ))}
    </div>
  );
}

const OverviewItem = (item) => {
  return (
    <div className={`mb-2 rounded-md  ${item?.bg} flex p-4 `}>
      {item?.icon}
      <div className='ml-4'>
        <b className='text-sm'>{item?.title}</b>
        <br />
        {item?.loading
          ? 'Load balance...'
          : item?.value
          ? `${item?.value} ${item?.symbol}`
          : '-'}
      </div>
    </div>
  );
};
