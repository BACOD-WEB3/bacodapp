import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import Footer from './Footer';
import Navbar from './Navbar';

type TLayout = {
  rightMenu?: any;
  children: any;
  sideBar: boolean;
};
// sticky
function Layout({ children, rightMenu, sideBar = true }: TLayout) {
  // isSideSpace
  // hasMenuLeft
  // leftMenu
  // rightMenu
  return (
    <div className='flex h-full w-full flex-col justify-center  '>
      <Navbar />
      {sideBar && (
        <div className='grid h-[93vh] w-full max-w-screen-xl grid-cols-9 self-center  '>
          <div className='col-span-2 '>
            <LeftMenu />
          </div>
          <div className='no-scrollbar col-span-7 scroll-p-0 overflow-scroll md:col-span-4'>
            <div className='overflow-scroll  md:hidden '>{rightMenu}</div>
            {children}
          </div>
          <div className='col-span-3 hidden overflow-scroll p-4 md:block'>
            {rightMenu}
          </div>
        </div>
      )}
      {!sideBar && (
        <div className='h-full w-full max-w-screen-xl self-center border backdrop-blur-md  '>
          {children}
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;

const LeftMenu = () => {
  // can hide accordion
  // small on responsive
  // sticky button logout on bottom
  return (
    <div className='flex h-full w-full flex-col justify-between pr-6'>
      <div>
        {LIST_MENU.map((item, i) => (
          <ItemMenu key={i} {...{ item }} />
        ))}
        {/* BUTTON WAR */}
        <Button onClick={() => null} className='w-full bg-rose-900 py-3'>
          WAR
        </Button>
        {/* COUNT DOWN */}
      </div>
      <div className='mb-2 p-2'>
        <SelfProfileBtn />
      </div>
      {/* sticky bottom */}
    </div>
  );
};

const SelfProfileBtn = () => {
  return (
    <Link href={`/profile`}>
      <div className='flex align-middle'>
        <div className='col-span-2 h-16 w-16 overflow-hidden rounded-full bg-gray-100' />
        <div className='ml-4 hidden flex-col justify-center md:flex'>
          NAME HERE
          <br />
          0xAcc
        </div>
      </div>
    </Link>
  );
};

const ItemMenu = ({ item }) => {
  if (item?.not_ready) {
    return (
      <div onClick={() => null} className='cursor-not-allowed  '>
        <div className='mb-2 overflow-hidden rounded-md bg-bg_third p-6 text-gray-600'>
          {item.title}
        </div>
      </div>
    );
  }
  return (
    <Link href={item.path} className=''>
      <div className='mb-2 overflow-hidden rounded-md bg-bg_third p-6 '>
        {item.title}
      </div>
    </Link>
  );
};

const LIST_MENU = [
  {
    title: 'Feeds',
    path: '/feeds',
    t: '',
  },
  {
    title: 'Store',
    path: '/store',
    t: '',
  },
  {
    title: 'Explore',
    t: '',
    path: '#',

    not_ready: true,
  },
  {
    title: 'Leaderboard',
    t: '',
    path: '#',

    not_ready: true,
  },
  {
    title: 'Notifications',
    path: '/notification',
    t: '',
  },
  {
    title: 'Network',
    path: '/network',
    t: '',
  },
  // {
  //   title: 'Profile',
  //   path: '/profile',
  //   t: '',
  // },
  {
    title: 'More',
    t: '',
    path: '#',
    not_ready: true,
  },
];
