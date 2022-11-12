import Button from '@/components/Button';
import Layout from '@/components/Layout';
import Overview from '@/components/Overview';
import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import TabProfile from '@/components/Profile/TabProfile';
import GiftCodes from '@/components/GiftCodes';
export default function Profile() {
  return (
    <Layout
      rightMenu={
        <div className=''>
          <Overview />
          <GiftCodes />
        </div>
      }
    >
      <HeaderProfile />
    </Layout>
  );
}

export const HeaderProfile = () => {
  return (
    <div className=''>
      <div className='h-[200px] bg-pink-300'>Profile Banner</div>
      <div className='flex justify-between  px-2'>
        <div className='my-5 -mt-[70px] h-32 w-32 overflow-hidden rounded-full bg-gray-700' />
        <Button className={`mt-2 h-10 rounded-md py-2`}>Edit Profile</Button>
        {/* FOLLOW /  */}
      </div>
      <div className='px-2 '>
        <b className='text-xl'>NAME DALE</b> &nbsp; <span>@handler</span>
        <div className='bio my-2 mb-4 text-sm font-thin text-gray-400'>
          Abolish daylight savings time and leap seconds
        </div>
        <div className='my-2  flex text-sm text-gray-400'>
          <div>Country</div> &nbsp;
          <div className='text-blue-400'>Link</div>&nbsp;
          <div>Joined</div>&nbsp;
        </div>
        <div className='flex '>
          <div>
            99 <span className='text-sm text-gray-400'>Followers</span>
          </div>{' '}
          &nbsp;
          <div>
            99 <span className='text-sm text-gray-400'>Following</span>
          </div>{' '}
          &nbsp;
        </div>
        <br />
        {/* TAB sections */}
        <TabProfile />
      </div>
    </div>
  );
};
