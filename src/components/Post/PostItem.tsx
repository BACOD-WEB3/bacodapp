import React from 'react';
import { classNames } from '../Profile/TabProfile';

export default function PostItem({ post, index }) {
  const RANDOM_COLOR = ['red', 'purple', 'green', 'orange', 'blue', 'pink'];

  return (
    <li className='relative  grid grid-cols-12  p-3 pb-6'>
      <div
        className={`col-span-2 h-16 w-16 overflow-hidden rounded-full bg-orange-800 `}
      />

      <div className='col-span-10 flex flex-col justify-between'>
        <span className='mb-2 font-bold'>VITALIK BUTERIN</span>
        <h3 className='text-sm font-medium leading-5'>{post.title}</h3>
        <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
          <li>{post.date}</li>
          <li>&middot;</li>
          <li>{post.commentCount} comments</li>
          <li>&middot;</li>
          <li>{post.shareCount} shares</li>
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
