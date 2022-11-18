// profile of others
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import Overview from '@/components/Overview';
import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import TabProfile from '@/components/Profile/TabProfile';
import GiftCodes from '@/components/GiftCodes';
import { HeaderProfile } from '.';

export default function ProfileSlug() {
  return (
    <Layout rightMenu={<div className=''></div>}>
      <HeaderProfile />
    </Layout>
  );
}
