import React from 'react';
import { classNames } from '../Profile/TabProfile';

export default function PostItem({ post, index }) {
  const RANDOM_COLOR = [
    'bg-red-700',
    'bg-purple-700',
    'bg-green-700',
    'bg-orange-700',
    'bg-blue-700',
    'bg-pink-700',
  ];

  return (
    <li className='relative  grid grid-cols-12  p-3 pb-6'>
      <div
        className={`col-span-2 h-16 w-16 overflow-hidden rounded-full border ${RANDOM_COLOR[index]} `}
      >
        {(!!post?.image || !!post?.user_image) && (
          <img
            src={post?.image ?? post?.user_image}
            alt=''
            className='h-full w-full'
          />
        )}
      </div>

      <div className='col-span-10 flex flex-col justify-between'>
        <span className='mb-2 font-bold'>{post?.username}</span>
        <h3 className='text-sm font-medium leading-5'>
          {post?.title || post?.post}
        </h3>
        <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
          <li>{post.date ?? '-'}</li>
          <li>&middot;</li>
          <li>{post.commentCount ?? '-'} comments</li>
          <li>&middot;</li>
          <li>{post.shareCount ?? '-'} shares</li>
        </ul>
        <a
          href='#'
          className={classNames(
            'absolute inset-0 rounded-md',
            'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
          )}
        />
      </div>
    </li>
  );
}
