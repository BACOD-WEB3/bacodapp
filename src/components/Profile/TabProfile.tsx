import { useState } from 'react';
import { Tab } from '@headlessui/react';
import PostItem from '../Post/PostItem';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TabProfile() {
  let [categories] = useState({
    Post: [
      {
        id: 1,
        title: `And we finalized!

        Happy merge all. This is a big moment for the Ethereum ecosystem. Everyone who helped make the merge happen should feel very proud today.`,
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 3,
        title: `And we finalized!

        Happy merge all. This is a big moment for the Ethereum ecosystem. Everyone who helped make the merge happen should feel very proud today.`,
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 4,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Collected: [],
    Likes: [],
  });

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
