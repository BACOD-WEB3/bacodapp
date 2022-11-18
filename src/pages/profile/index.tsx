import Button from '@/components/Button';
import Layout from '@/components/Layout';
import Overview from '@/components/Overview';
import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import TabProfile from '@/components/Profile/TabProfile';
import GiftCodes from '@/components/GiftCodes';
import useProfile from '@/hooks/useProfile';
import { notify } from '@/components/Toast';
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
export const checkValidImgUrl = (val) => {
  const x = val.split('/');
  return x[x.length - 1] !== 'undefined';
};

export const HeaderProfile = () => {
  const { profile_cache } = useProfile();

  return (
    <div className=''>
      <div className='h-[200px] bg-bg_third'>
        {console.log(profile_cache?.coverImage, 'profile_cache?.coverImage')}
        {!!profile_cache?.coverImage &&
        checkValidImgUrl(profile_cache?.coverImage) ? (
          <img
            src={profile_cache?.coverImage}
            alt=''
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='h-full w-full bg-gray-600 object-cover' />
        )}
      </div>
      <div className='flex justify-between  px-2'>
        <div className='my-5 -mt-[70px] h-32 w-32 overflow-hidden rounded-full border bg-gray-700'>
          {!!profile_cache?.image && checkValidImgUrl(profile_cache?.image) ? (
            <img src={profile_cache?.image} alt='' className='h-full w-full' />
          ) : (
            <div className='h-full w-full' />
          )}
        </div>
        <Button
          onClick={() => notify('Sorry, On development')}
          className={`mt-2 h-10 rounded-md py-2`}
        >
          Edit Profile
        </Button>
        {/* FOLLOW /  */}
      </div>
      <div className='px-2 '>
        <b className='text-xl'>{!!profile_cache && profile_cache?.username}</b>{' '}
        &nbsp; <span>@handler</span>
        <div className='bio my-2 mb-4 text-sm font-thin text-gray-400'>
          {!!profile_cache && profile_cache?.bio}
        </div>
        <div className='my-2  flex text-sm text-gray-400'>
          {!!profile_cache?.country && (
            <div>{profile_cache?.country}&nbsp;</div>
          )}
          <div className='text-blue-400'>Link &nbsp;</div>
          <div>Joined</div>&nbsp;
        </div>
        <div className='flex '>
          <div>
            0 <span className='text-sm text-gray-400'>Followers</span>
          </div>{' '}
          &nbsp;
          <div>
            0 <span className='text-sm text-gray-400'>Following</span>
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
