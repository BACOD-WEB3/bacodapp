import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import {
  Combobox,
  Dialog,
  Disclosure,
  Menu,
  Transition,
} from '@headlessui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeftOnRectangleIcon,
  AtSymbolIcon,
  Bars3Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  CubeTransparentIcon,
  InformationCircleIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import coinbase_img from '../../../public/icon/coinbase.svg';
import browserwallet_img from '../../../public/icon/metamask.svg';
import walletconnect_img from '../../../public/icon/walletconnect.svg';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { notifyError } from '../Toast';

export default function ModalWallet({ showLogin, setShowLogin }) {
  //   const [showLogin, setShowLogin] = useState(false);
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  return (
    <Transition.Root
      show={showLogin}
      as={Fragment}
      //   afterLeave={() => setQuery('')}
      appear
    >
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => setShowLogin(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='mx-auto w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                <div className='flex items-center justify-between'>
                  <div className='text-md flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      aria-hidden='true'
                      className='mr-2 h-5 w-5 text-green-500'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
                      ></path>
                    </svg>
                    Login
                  </div>
                  <button
                    onClick={() => setShowLogin(false)}
                    type='button'
                    className='rounded-full p-1 text-gray-800 hover:bg-gray-200'
                    tabIndex={0}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      aria-hidden='true'
                      className='h-5 w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </button>
                </div>
              </Dialog.Title>
              <div className='mt-2'>
                <p className='truncate text-sm font-semibold text-gray-700'>
                  Connect your wallet to sign in
                </p>
                <div className='mt-4 inline-block w-full transform space-y-3 overflow-hidden text-left align-middle transition-all'>
                  <button
                    onClick={() => {
                      const injectedWallet = connectors[3];
                      if (!injectedWallet.ready)
                        return notifyError('Install metamask');

                      connect({ connector: injectedWallet });
                    }}
                    type='button'
                    className='hidden w-full items-center justify-center space-x-2.5 overflow-hidden rounded-lg border-2 px-3 py-3 outline-none hover:bg-gray-100 sm:flex'
                  >
                    <span className='flex w-full items-center justify-between text-sm font-bold text-gray-900'>
                      MetaMask / Browser Wallet
                    </span>
                    <Image
                      src={browserwallet_img}
                      draggable='false'
                      className='h-6 w-6'
                      height='24'
                      width='24'
                      alt='injected'
                    />
                  </button>

                  {/* <button
                    // onClick={() => user.web3.connectWallet('walletConnect')}
                    type='button'
                    className='flex w-full items-center justify-center space-x-2.5 overflow-hidden rounded-lg border-2 px-3 py-3 outline-none hover:bg-gray-100 sm:hidden'
                  >
                    <span className='flex w-full items-center justify-between text-sm font-bold text-gray-900'>
                      MetaMask
                    </span>
                    <Image
                      src={browserwallet_img}
                      draggable='false'
                      className='h-6 w-6'
                      height='24'
                      width='24'
                      alt='walletConnect'
                    />
                  </button> */}
                  {/* <button
                    // onClick={() => user.web3.connectWallet('walletConnect')}
                    type='button'
                    className='flex w-full items-center justify-center space-x-2.5 overflow-hidden rounded-lg border-2 px-3 py-3 outline-none hover:bg-gray-100'
                  >
                    <span className='flex w-full items-center justify-between text-sm font-bold text-gray-900'>
                      WalletConnect
                    </span>
                    <Image
                      src={walletconnect_img}
                      draggable='false'
                      className='h-6 w-6'
                      height='24'
                      width='24'
                      alt='walletConnect'
                    />
                  </button>
                  <button
                    // onClick={() => user.web3.connectWallet('coinbaseWallet')}
                    type='button'
                    className='flex w-full items-center justify-center space-x-2.5 overflow-hidden rounded-lg border-2 px-3 py-3 outline-none hover:bg-gray-100'
                  >
                    <span className='flex w-full items-center justify-between text-sm font-bold text-gray-900'>
                      Coinbase Wallet
                    </span>
                    <Image
                      src={coinbase_img}
                      draggable='false'
                      className='h-6 w-6'
                      height='24'
                      width='24'
                      alt='walletConnect'
                    />
                  </button> */}
                </div>
                {/* <p className='mt-4 text-xs text-gray-500'>
                  By connecting your wallet, you agree to our{' '}
                  <Link
                    href='/policies/terms-and-privacy'
                    className='underline'
                  >
                    Terms of Service
                  </Link>{' '}
                  and our{' '}
                  <Link
                    href='/policies/terms-and-privacy'
                    className='underline'
                  >
                    Privacy Policy
                  </Link>
                  .
                </p> */}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
