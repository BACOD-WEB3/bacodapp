import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import Footer from './Footer';
import Navbar from './Navbar';
import {
  MagnifyingGlassIcon,
  HashtagIcon,
  ChartBarSquareIcon,
  ShoppingBagIcon,
  ChatBubbleLeftEllipsisIcon,
  BellAlertIcon,
  UserGroupIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

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
          <div className='col-span-3 hidden overflow-scroll pl-4 md:block'>
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
  const route = useRouter();
  return (
    <div className='flex h-full w-full flex-col justify-between pr-6'>
      <div>
        {LIST_MENU.map((item, i) => (
          <ItemMenu key={i} {...{ item }} />
        ))}
        {/* BUTTON WAR */}
        <Button
          onClick={() => route.push('/war')}
          className='w-full bg-rose-900 py-3'
        >
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
        <div className='mb-2 flex overflow-hidden rounded-md bg-bg_third p-6 text-gray-600'>
          <div>{item.icon}</div> &nbsp;
          <div className='hidden md:block'>{item.title}</div>
        </div>
      </div>
    );
  }
  return (
    <Link href={item.path} className=''>
      <div className='mb-2 flex overflow-hidden rounded-md bg-bg_third p-6 '>
        <div>{item.icon}</div> &nbsp;
        <div className='hidden md:block'>{item.title}</div>
      </div>
    </Link>
  );
};

const LIST_MENU = [
  {
    title: 'Feeds',
    path: '/feeds',
    t: '',
    icon: <ChatBubbleLeftEllipsisIcon className='h-6 w-6' />,
  },
  {
    title: 'Store',
    path: '/store',
    t: '',
    icon: <ShoppingBagIcon className='h-6 w-6' />,
  },
  {
    title: 'Explore',
    t: '',
    path: '#',
    not_ready: true,
    icon: <HashtagIcon className='h-6 w-6' />,
  },
  {
    title: 'Leaderboard',
    t: '',
    path: '#',

    not_ready: true,
    icon: <ChartBarSquareIcon className='h-6 w-6' />,
  },
  {
    title: 'Notifications',
    path: '/notification',
    t: '',
    icon: <BellAlertIcon className='h-6 w-6' />,
  },
  {
    title: 'Network',
    path: '/network',
    t: '',
    icon: <UserGroupIcon className='h-6 w-6' />,
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
    icon: <EllipsisVerticalIcon className='h-6 w-6' />,
  },
];
