import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useContractX from '@/hooks/useContractX';
import useProfile from '@/hooks/useProfile';
import useSteps from '@/hooks/useSteps';
import useTronContract from '@/hooks/useTronContract';
import ipfs from '@/utils/ipfs';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { notify, notifyError, notifyWarning } from '../Toast';

const Step3 = () => {
  const { type2, addressReferral } = useSteps();
  const { setProfile } = useProfile();
  const { callContract, contract } = useContractX('profile');

  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [profileImageBuffer, setProfileImageBuffer] = useState(null);
  const [coverImage, setCoverImage] = useState('');
  const [coverImageBuffer, setCoverImageBuffer] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [webHandle, setWebHandle] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onChangeCoverImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!saving) {
      if (!coverImage) {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          if (file.size > 5000000) {
            notifyWarning('Cover photo can not exceed 5MB');
          } else if (
            file.type === 'image/gif' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg' ||
            file.type === 'image/jpeg'
          ) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
              console.log('Buffer file data: ', Buffer(reader.result));
              setCoverImageBuffer(Buffer(reader.result));
            };
            setCoverImage({
              file: file,
              src: URL.createObjectURL(file),
            });
          } else {
            notifyWarning('This file type is not accepted');
          }
        }
      } else {
        setCoverImage('');
      }
    }
  };

  const onChangeProfileImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!saving) {
      if (!profileImage) {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          if (file.size > 5000000) {
            notifyWarning('Cover photo can not exceed 5MB');
          } else if (
            file.type === 'image/gif' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg' ||
            file.type === 'image/jpeg'
          ) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
              console.log('Buffer file data: ', Buffer(reader.result));
              setProfileImageBuffer(Buffer(reader.result));
            };
            setProfileImage({
              file: file,
              src: URL.createObjectURL(file),
            });
          } else {
            notifyWarning('This file type is not accepted');
          }
        }
      } else {
        setProfileImage('');
      }
    }
  };

  const Submit = async () => {
    console.log(contract, 'contract');
    // if(!!addressReferral && type2 !==)
    const id = toast.loading('Submitting, please wait...');
    setSaving(true);
    let IMG_PROFILE;
    let IMG_COVER;
    try {
      // 1. upload images to storage (replace ipfs post-hack-thon)
      if (!!profileImageBuffer) {
        IMG_PROFILE = await ipfs.add(profileImageBuffer);
      }
      if (!!coverImageBuffer) {
        IMG_COVER = await ipfs.add(coverImageBuffer);
      }

      const payload = {
        image: `https://ipfs.io/ipfs/${IMG_PROFILE?.path}`,
        profileImage: `https://ipfs.io/ipfs/${IMG_PROFILE?.path}`,
        coverImage: `https://ipfs.io/ipfs/${IMG_COVER?.path}`,
        name: username,
        description: bio,
        // default -----
        username,
        email,
        bio,
        twitterHandle,
        country: webHandle,
        // metadata
      };

      // 2. saveProfile to storage (replace ipfs post-hack-thon)
      let storageID;
      let storageURL;
      const ipfsId = await ipfs.add(JSON.stringify(payload));
      storageID = ipfsId?.path;
      storageURL = `https://ipfs.io/ipfs/${ipfsId.path}`;

      const method =
        type2 === 'whitelist'
          ? 'mintByWL'
          : type2 === 'code'
          ? 'mintByCode'
          : 'mintByProduct';

      const args =
        type2 === 'whitelist'
          ? [storageURL] // + email  -> collect email on chain for post-hackthon
          : type2 === 'code'
          ? [storageURL, addressReferral] // + address parent
          : [storageURL];
      // 2. mint profile
      const tx = await callContract(
        method,
        args //length depending on args too
      );
      console.log(tx, 'tx');

      // cache profile, send notif success
      setSaving(false);
      setProfile(payload);
      toast.update(id, {
        render: `Sucess minting profile, welcome ${username}`,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
      notify(
        'Welcome to the the DApp, ' + username + '! quickly invite your friend'
      );
      router.push('/store');
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
    <div className='flex overflow-scroll px-4'>
      <form onSubmit={(e) => e.preventDefault()} className='mx-auto w-full'>
        <div className='space-y-8 divide-y divide-gray-200'>
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='profile-image-upload'
                    className='block  items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Profile Picture
                  </label>
                  <input
                    disabled={saving}
                    onChange={onChangeProfileImage}
                    accept='image/png, image/jpeg, image/gif, image/jpeg'
                    id='profile-image-upload'
                    name='profile-image-upload'
                    type='file'
                    className='sr-only'
                  />
                  <div className='mt-1 flex items-center'>
                    <span
                      onClick={() =>
                        profileImage
                          ? null
                          : document
                              .getElementById('profile-image-upload')
                              .click()
                      }
                      className={`h-16 w-16 overflow-hidden rounded-full bg-gray-100 ${
                        !profileImage && 'cursor-pointer'
                      }`}
                    >
                      {!profileImage && (
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      )}
                      {profileImage && (
                        <img
                          src={`${profileImage.src}`}
                          className='h-full w-full bg-cover bg-center'
                          alt='Profile Image'
                        />
                      )}
                    </span>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={
                        profileImage
                          ? onChangeProfileImage
                          : () =>
                              document
                                .getElementById('profile-image-upload')
                                .click()
                      }
                      className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0'
                    >
                      {profileImage ? 'Remove image' : 'Select image'}
                    </Button>
                  </div>
                </div>

                <div
                  onClick={() =>
                    coverImage
                      ? null
                      : document.getElementById('cover-image-upload').click()
                  }
                  id='coverImageContainer'
                  className={` sm:col-span-6 ${
                    !coverImage && 'cursor-pointer'
                  }`}
                >
                  <label
                    htmlFor='cover-image-upload'
                    className=' flex items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Cover photo
                    <span className='text-right text-xs text-gray-400'>
                      Optional
                    </span>
                  </label>
                  <div
                    style={{
                      backgroundImage: coverImage
                        ? `url(${coverImage.src})`
                        : null,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      height: 240,
                    }}
                    className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'
                  >
                    {!coverImage && (
                      <div className='space-y-1 py-12 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='cover-image-upload'
                            className='relative'
                          >
                            <input
                              disabled={saving}
                              onChange={onChangeCoverImage}
                              value={coverImage}
                              accept='image/png, image/jpeg, image/gif, image/jpeg'
                              id='cover-image-upload'
                              name='cover-image-upload'
                              type='file'
                              className='sr-only'
                            />
                          </label>
                          <p className='pl-1'>
                            <span className=' text-brand-primary focus-within:ring-brand-primary hover:text-brand-primary rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                              Upload a file
                            </span>
                            &nbsp;or drag and drop
                          </p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    {coverImage && (
                      <div className='relative w-full cursor-pointer'>
                        <XMarkIcon
                          onClick={onChangeCoverImage}
                          className='text-brand-primary absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white hover:text-red-500'
                          aria-hidden='true'
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* --------------- */}
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='username'
                    className=' flex items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Username
                    <span className='text-right text-xs text-gray-400'>
                      {20 - username.length} characters left
                    </span>
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm'>
                      @
                    </span>
                    <input
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const newUsername = e.target.value.replaceAll(' ', '');
                        // if (validateUsername(newUsername || username === "")) {
                        setUsername(newUsername);
                        // }
                      }}
                      required
                      maxLength={20}
                      value={username}
                      disabled={saving}
                      type='text'
                      name='username'
                      id='username'
                      autoComplete='username'
                      className='focus:border-brand-primary focus:ring-brand-primary block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 p-2 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='email'
                    className=' flex items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Email address
                    <span className='text-right text-xs text-gray-400'>
                      Optional
                    </span>
                  </label>
                  <div className='mt-1'>
                    <input
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                        }
                      }}
                      required
                      maxLength={100}
                      onChange={(e) =>
                        setEmail(e.target.value.replaceAll(' ', ''))
                      }
                      value={email}
                      id='email'
                      name='email'
                      disabled={saving}
                      type='email'
                      placeholder='your@email.com'
                      autoComplete='email'
                      className='focus:border-brand-primary focus:ring-brand-primary block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='twitterHandle'
                    className='block flex items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Twitter Handle
                    <span className='text-right text-xs text-gray-400'>
                      Optional
                    </span>
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setTwitterHandle(e.target.value.replaceAll(' ', ''));
                      }}
                      maxLength={40}
                      value={twitterHandle}
                      disabled={saving}
                      type='text'
                      name='twitterHandle'
                      id='twitterHandle'
                      className='focus:border-brand-primary focus:ring-brand-primary block w-full min-w-0 flex-1 rounded-md border-gray-300  p-2 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='twitterHandle'
                    className='block flex items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Country
                    <span className='text-right text-xs text-gray-400'>
                      Optional
                    </span>
                  </label>
                  <div className='mt-1 flex rounded-md shadow-sm'>
                    <input
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setWebHandle(e.target.value.replaceAll(' ', ''));
                      }}
                      maxLength={40}
                      value={webHandle}
                      disabled={saving}
                      type='text'
                      name='webHandle'
                      id='webHandle'
                      className='focus:border-brand-primary focus:ring-brand-primary block w-full min-w-0 flex-1 rounded-md border-gray-300 p-2 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-6'>
                  <label
                    htmlFor='about'
                    className='block flex items-center justify-between text-sm font-medium text-gray-100'
                  >
                    Bio
                    <span className='text-right text-xs text-gray-400'>
                      {200 - bio.length} characters left
                    </span>
                  </label>
                  <div className='mt-1'>
                    <textarea
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={200}
                      id='about'
                      name='about'
                      disabled={saving}
                      rows={3}
                      className='focus:border-brand-primary focus:ring-brand-primary block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm'
                      value={bio}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          disabled={saving}
          type='submit'
          color='brand'
          onClick={Submit}
          variant={username !== '' && email !== '' ? 'solid' : 'outline'}
          className='mt-8 mb-10 w-full rounded-md bg-rose-500'
        >
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default Step3;
