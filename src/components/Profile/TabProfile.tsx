import { useState } from 'react';
import { Tab } from '@headlessui/react';
import PostItem from '../Post/PostItem';
import useProfile from '@/hooks/useProfile';
import { useLoadFeed } from '@/hooks/useLoadFeed';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TabProfile() {
  const { profile_cache } = useProfile();

  const { self_feeds, loading } = useLoadFeed();

  const categories = {
    Post: [
      {
        id: 1,
        username: profile_cache?.username,
        image: profile_cache?.profileImage,
        title: `Hey, I'm the future you!
        Can't believe I'm the beta tester of this amazing dapp. Hmmmph, but this is not my first post, so what should i write?  `,
        date: '5y later',
        commentCount: 5,
        shareCount: 2,
        future: true, // just markethings
      },
      {
        id: 2,
        username: profile_cache?.username,
        image: profile_cache?.image,
        title: `also don't forget to buy bitcoin and stick to this app, trust me I'm from the future, :wink :wink`,
        commentCount: 999,
        shareCount: 200,
        future: true, // just markethings
      },
      ...self_feeds,
    ],
    Collected: [],
    Likes: [],
  };

  return (
    <div className='w-full '>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-bg_secondary p-1'>
          {Object.keys(categories).map((category, i) => (
            <Tab
              disabled={i !== 0}
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-100',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-bg_third shadow'
                    : 'text-blue-100 hover:bg-gray-600/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-transparent py-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {loading && <div>Loading...</div>}

              <ul>
                {posts.map((post, i) => (
                  <PostItem key={post.id} {...{ post, index: i }} />
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
