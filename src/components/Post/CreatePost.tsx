import useContractX from '@/hooks/useContractX';
import usePostFeed from '@/hooks/useLoadFeed';
import useProfile from '@/hooks/useProfile';
import ipfs from '@/utils/ipfs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import { notify, notifyError } from '../Toast';

export default function CreatePost() {
  const [post, setPost] = useState('');
  const [saving, setSaving] = useState(false);
  const { profile_cache } = useProfile();
  const { contract } = useContractX('feeds');
  const { loadAllFeeds } = usePostFeed();

  const onSubmit = async () => {
    const id = toast.loading('Submitting, please wait...');
    setSaving(true);
    console.log(profile_cache, 'profilecachce');
    try {
      const payload = {
        image: profile_cache?.image,
        name: profile_cache?.username,
        user_image: profile_cache?.image,
        username: profile_cache?.username,
        country: profile_cache?.country,
        post,
        // metadata
      };

      // 2. saveProfile to storage (replace ipfs post-hack-thon)
      let storageID;
      let storageURL;
      const ipfsId = await ipfs.add(JSON.stringify(payload));
      storageID = ipfsId?.path;
      storageURL = `https://ipfs.io/ipfs/${ipfsId.path}`;

      const tx = await contract?.safeMint(storageURL);
      console.log(tx, 'tx');

      setSaving(false);
      toast.update(id, {
        render: `Sucess minting post`,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });

      loadAllFeeds();
      //  LOAD FEEDS AGAIN
    } catch (error) {
      notifyError(error?.toString());
      toast.update(id, {
        render: `Failed: ${error}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
      setSaving(false);
    }
  };

  return (
    <div className=''>
      {/* <label
        htmlFor='about'
        className=' flex items-center justify-between text-sm font-medium text-gray-100'
      >
        CreatePost
        <span className='text-right text-xs text-gray-100'>
          {200 - text.length} characters left
        </span>
      </label> */}
      <div className='-1'>
        <textarea
          onChange={(e) => setPost(e.target.value)}
          maxLength={200}
          id='posting'
          name='posting'
          placeholder='Create post...'
          disabled={saving}
          rows={4}
          className='focus:border-brand-primary focus:ring-brand-primary block w-full rounded-md border-gray-300 bg-bg_third p-2 shadow-sm sm:text-sm'
          value={post}
        />
      </div>
      <div className='my-2 flex  w-full justify-between'>
        <div className='flex'>
          <Button
            onClick={() => notify('On development')}
            className={`mr-2 bg-red-900`}
          >
            Tag
          </Button>
          <Button
            onClick={() => notify('On development')}
            className={`bg-purple-900`}
          >
            Image
          </Button>
          {/* LOCATION ON */}
        </div>
        <Button
          onClick={() => notify('On development')}
          className={`bg-sky-300 px-10`}
        >
          FREEZE
        </Button>
        <Button disabled={saving} onClick={onSubmit} className={`bg-pink-900`}>
          Post
        </Button>
      </div>
    </div>
  );
}
