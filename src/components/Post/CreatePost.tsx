import React from 'react';
import Button from '../Button';

export default function CreatePost() {
  return (
    <div className=''>
      <label
        htmlFor='about'
        className=' flex items-center justify-between text-sm font-medium text-gray-100'
      >
        CreatePost
        <span className='text-right text-xs text-gray-100'>
          {/* {200 - bio.length} characters left */}
        </span>
      </label>
      <div className='mt-1'>
        <textarea
          // onChange={(e) => setBio(e.target.value)}
          maxLength={200}
          id='about'
          name='about'
          // disabled={saving}
          rows={4}
          className='focus:border-brand-primary focus:ring-brand-primary block w-full rounded-md border-gray-300 bg-bg_third shadow-sm sm:text-sm'
          // value={bio}
        />
      </div>
      <div className='my-2 flex  w-full justify-between'>
        <div className='flex'>
          <Button className={`mr-2 bg-red-900`}>Tag</Button>
          <Button className={`bg-purple-900`}>Image</Button>
          {/* LOCATION ON */}
        </div>
        <Button className={`bg-sky-300 px-10`}>FREEZE</Button>
        <Button className={`bg-pink-900`}>Post</Button>
      </div>
    </div>
  );
}
