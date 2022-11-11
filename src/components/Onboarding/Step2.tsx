import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useSteps from '@/hooks/useSteps';
import { useEffect, useState } from 'react';

const Step2 = () => {
  // referral code or checking whitelist section
  const { type2 } = useSteps();

  return (
    <div>
      {type2 === 'whitelist' && <Step2WL />}
      {type2 === 'code' && <Step2Code />}
      {type2 === 'product' && <Step2Product />}
    </div>
  );
};

export default Step2;

//
//
//
//

const Step2WL = () => {
  return <div>wl</div>;
};

const Step2Code = () => {
  const { setStep } = useSteps();

  return (
    <div className='flex  px-4'>
      <form onSubmit={(e) => e.preventDefault()} className='mx-auto w-full'>
        {/* {invitationType === "claim_nft" && (
                              <div>
                                  <h2 className="text-md mb-2 font-medium text-brand-dark">
                                      You are eligible to claim a free Inception NFT
                                  </h2>
                                  <p className="mb-6 text-sm text-gray-500"></p>
                              </div>
                          )} */}
        <div>
          <h2 className='text-md text-brand-dark mb-2 font-medium'>
            Fill the code from your invitation
          </h2>
          <p className='mb-6 text-sm text-gray-500'></p>
          <div>
            <div className='focus-within:border-brand-primary relative mb-4 rounded-md border-2 px-3 py-2 '>
              <label
                htmlFor='referralcode'
                className='absolute -top-3 left-2 -mt-px inline-block bg-white px-1 text-sm font-medium text-gray-900'
              >
                Enter Referral Code
              </label>
              <input
                //   required={true !== 'referral_code'}
                onChange={(e) => {}}
                type='text'
                value={`referralCode`}
                name='referralcode'
                id='referralcode'
                className='text-brand-dark block w-full border-0 p-0 placeholder-gray-500 focus:ring-0 sm:text-sm'
                placeholder='XXXX-XXXX-XXXX-XXXX'
              />
            </div>
            <div className='focus-within:border-brand-primary relative rounded-md  border-2 px-3 py-2 '>
              <label
                htmlFor='giftcode'
                className='absolute -top-3 left-2 -mt-px inline-block bg-white px-1 text-sm font-medium text-gray-900'
              >
                Enter Gift Code
              </label>
              <input
                required
                onChange={(e) => alert(e.target.value.replaceAll(' ', ''))}
                type='text'
                // value={giftCode}
                name='giftcode'
                id='giftcode'
                className='text-brand-dark block w-full border-0 p-0 placeholder-gray-500 focus:ring-0 sm:text-sm'
                placeholder='XXXX-XXXX-XXXX-XXXX'
              />
            </div>
          </div>
        </div>
        <div className='my-8 grid grid-cols-2 gap-5 '>
          <Button
            type='submit'
            // variant={invitationType === "claim_nft" ? "solid" : !giftCode || !referralCode ? "outline" : "solid"}
            color='brand'
            // onClick={mint}
            className='col-span-2 w-full rounded-md md:col-span-1'
          >
            Validate
          </Button>
          <Button
            onClick={() => setStep(1)}
            // disabled={loading}
            className='col-span-2 w-full underline md:col-span-1'
            variant='outline'
            color='darktransparent'
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
};

const Step2Product = () => {
  return <div>wl</div>;
};
