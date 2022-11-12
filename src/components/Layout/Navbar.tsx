import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React from 'react';

export default function Navbar() {
  return (
    <div
      className={`z-30 flex w-full max-w-screen-xl justify-between self-center bg-transparent  py-4 `}
    >
      <b className='ts-m text-red- text-lg'>ShuoCIAL</b>
      <div></div>
      <AccountButton />
    </div>
  );
}

const AccountButton = () => {
  const { isLogin } = useAuth();
  const router = useRouter();
  return (
    <button
      className='text-orange-600'
      onClick={() => {
        if (isLogin) {
          router.push('/store');
        } else {
          router.push('/auth/onboarding');
        }
      }}
    >
      connect wallet
    </button>
  );
};
