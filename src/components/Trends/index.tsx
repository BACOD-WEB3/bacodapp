import React from 'react';

export default function Trends() {
  return (
    <div>
      <span>Popular now</span>
      <div className='mt-4 rounded-md bg-bg_secondary p-2'>
        {[1, 1, 1, 1].map((item, i) => {
          return (
            <div className='m-2 pb-2' key={i}>
              <strong>TEXT HERE</strong>
              <p className='text-xs text-gray-600'>18.2k Collected</p>
            </div>
          );
        })}
      </div>
      <br />
      <span>Active right now</span>
      <div className='mt-4 rounded-md bg-bg_secondary p-2'>
        {[1, 1, 1, 1, 1].map((item, i) => {
          return (
            <div className='m-2 pb-2' key={i}>
              <strong>Name ABCDE</strong>
              <p className='text-xs text-gray-600'>currrently playing ...</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
