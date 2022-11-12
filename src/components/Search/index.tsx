import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
export default function Search() {
  return (
    <button
      onClick={() => alert('true')}
      className='relative flex w-full font-semibold text-gray-100'
    >
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
      </div>
      <input
        type='text'
        className='block w-full rounded-full border-0 bg-bg_secondary p-2 pl-10 text-sm focus:outline-none focus:ring-0'
        placeholder='Search'
      />
    </button>
  );
}
