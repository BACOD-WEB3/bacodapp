import useProfile from '@/hooks/useProfile';
import { makeid } from '@/utils/helper';
import { utils } from 'ethers';
import React from 'react';
import { notify } from '../Toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import useTronContract from '@/hooks/useTronContract';
import useGiftCodes, { useGC } from '@/hooks/useGiftCodes';
import { useInfo } from '@/hooks/useOverview';
import { useAccount, useContractRead } from 'wagmi';
import { CONTRACTS_SETUP } from '@/utils/network_config';

const OVERVIEW = [
  { title: 'EARNING', value: 9000, bg: 'red' },
  { title: 'TRX', value: 9000 },
  { title: 'TUSD', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
  { title: 'POINTS', value: 9000 },
];

const CopyWrapper = ({ children, value }) => (
  <CopyToClipboard text={value} onCopy={() => notify('Copying: ' + value)}>
    {children}
  </CopyToClipboard>
);
export default function GiftCodes() {
  // const { profile_cache, tokenID } = useProfile();
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACTS_SETUP['profile'].address,
    abi: CONTRACTS_SETUP['profile'].abi,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, 0],
    chainId: CONTRACTS_SETUP.chainID,
  });

  const VOUCHER =
    isLoading && !data
      ? `Loading...`
      : `${makeid(2)}-${makeid(2)}x${data}`.toUpperCase();
  const { overview } = useInfo();
  useGiftCodes();

  return (
    <div className='px-2 '>
      <br />
      <CopyWrapper value={VOUCHER}>
        <div className='flex cursor-pointer justify-between rounded-md border bg-bg_third p-2'>
          Referral Code: <b className='text-red-300'>{VOUCHER}</b>
          <ClipboardDocumentIcon className='h-6 w-6' />
        </div>
      </CopyWrapper>
      <br />
      <br />
      GiftCodes ({Number(overview?.giftcode) ?? '-'}):
      {/* visible eyes */}
      {!!Number(overview?.giftcode) &&
        Array.from({ length: overview?.giftcode }).map((item, i) => (
          <Code key={i} {...{ item }} />
        ))}
    </div>
  );
}

const Code = ({ item }) => {
  const VOUCHER = uuidv4().substring(0, 23);
  return (
    <CopyWrapper value={VOUCHER}>
      <div className='mb-2 flex cursor-pointer  justify-between rounded-md bg-bg_secondary p-4'>
        {VOUCHER}
        <ClipboardDocumentIcon className='h-6 w-6' />
      </div>
    </CopyWrapper>
  );
};
