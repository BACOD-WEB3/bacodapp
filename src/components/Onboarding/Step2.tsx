import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useContractX from '@/hooks/useContractX';
import useSteps from '@/hooks/useSteps';
import useTronContract from '@/hooks/useTronContract';
import { encodeId } from '@/utils/helper';
import { CONTRACTS_SETUP } from '@/utils/network_config';
import { utils } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { Loader } from '../Loading/LoadingScreen';
import { notify, notifyError, notifySuccess, notifyWarning } from '../Toast';

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
  const [pass, setPass] = useState<boolean | null>(null);
  const { setStep } = useSteps();

  useEffect(() => {
    setTimeout(() => setPass(true), 1000);
  }, []);
  useEffect(() => {
    console.log(pass, 'pas');
    if (pass) {
      setStep(3);
      notifySuccess("You are allowed to mint, let's fill the form");
    }
  }, [pass]);

  return (
    <div className='flex max-h-[300px] w-full flex-col justify-center self-center  text-center align-middle'>
      Checking your account...
      <div className=' max-w-[300px] self-center '>
        <Loader className='h-40 w-40 ' />
      </div>
      {/* sorry your account isn't in our whitelist or full of quote (if hackthon), please get giftcodes from other */}
    </div>
  );
};

const Step2Code = () => {
  const { setStep, setAddressReferral } = useSteps();

  const [referralCode, setReferralCode] = useState('');
  const [giftCode, setGiftcode] = useState('');
  const { callContract, contract } = useContractX('profile');
  const { chains, switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  // todo: should burn the nft giftcode
  const submint = async () => {
    if (chain?.id !== CONTRACTS_SETUP.chainID) {
      notifyError('Please change network to ' + CONTRACTS_SETUP.networkName);
      switchNetwork(CONTRACTS_SETUP.chainID);
    }
    console.log(encodeId(referralCode), 'encodeId(referralCode)');
    if (
      !referralCode ||
      referralCode.length < 5 ||
      !giftCode ||
      !giftCode.length
    ) {
      notifyError('Something wrong with your input');
    } else {
      try {
        const res = await contract?.ownerOf(Number(encodeId(referralCode)));

        console.log(res, 'res step2');
        setAddressReferral(res);
        // setAddressReferral(tronWeb.address.fromHex(res));
        setAddressReferral(res);
        notify('Got it, you can mint with this giftcode');
        setStep(3);
      } catch (error) {
        console.log(error, 'erro');
        notifyError('We dont detect this code');
      }
    }
    // check and call
  };

  return (
    <div className='flex  px-4'>
      <form onSubmit={(e) => e.preventDefault()} className='mx-auto w-full'>
        <div>
          {/* <h2 className='text-md text-brand-dark mb-2 font-medium'>
            Fill the code from your invitation
          </h2> */}
          <p className='mb-6 text-sm text-gray-500'></p>
          <div>
            <div className='focus-within:border-brand-primary relative mb-4 rounded-md border-2 bg-bg_third px-3 py-2'>
              <label
                htmlFor='referralcode'
                className='absolute -top-3 left-2 -mt-px inline-block rounded-md bg-bg_primary  px-1 text-sm font-medium text-gray-100'
              >
                Enter Referral Code
              </label>
              <input
                //   required={true !== 'referral_code'}
                onChange={(e) => {
                  e.preventDefault();
                  setReferralCode(e.target.value);
                }}
                type='text'
                value={referralCode}
                name='referralcode'
                id='referralcode'
                className='text-brand-dark block w-full border-0 bg-bg_third p-2  text-gray-100 placeholder-gray-100 focus:ring-0 sm:text-sm'
                placeholder='XXXX-XXXX-XXXX-XXXX'
              />
            </div>
            <div className='focus-within:border-brand-primary relative rounded-md  border-2 bg-bg_third px-3 py-2 '>
              <label
                htmlFor='giftcode'
                className='absolute -top-3 left-2 -mt-px inline-block rounded-md bg-bg_primary  px-1 text-sm font-medium text-gray-100'
              >
                Enter Gift Code
              </label>
              <input
                required
                // onChange={(e) => alert(e.target.value.replaceAll(' ', ''))}
                onChange={(e) => {
                  e.preventDefault();
                  setGiftcode(e.target.value);
                }}
                type='text'
                value={giftCode}
                name='giftcode'
                id='giftcode'
                className='text-brand-dark block w-full border-0 bg-bg_third p-2  text-gray-100 placeholder-gray-100 focus:ring-0 sm:text-sm'
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
            onClick={submint}
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
  const [pass, setPass] = useState<boolean | null>(null);
  const { setStep } = useSteps();

  useEffect(() => {
    setTimeout(() => setPass(true), 3000);
  }, []);
  useEffect(() => {
    if (pass) {
      setStep(1);
      notifyWarning('Sorry you dont have the product');
    }
  }, [pass]);
  return (
    <div className='flex max-h-[300px] w-full flex-col justify-center self-center  text-center align-middle'>
      Checking your available profile packs...
      <div className=' max-w-[300px] self-center '>
        <Loader className='h-40 w-40 ' />
      </div>
      {/* sorry your account isn't in our whitelist or full of quote (if hackthon), please get giftcodes from other */}
    </div>
  );
};
