import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useSteps from '@/hooks/useSteps';
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CubeTransparentIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const IconStep1 = () => (
  <svg className='mr-4 h-7 w-7 shrink-0 fill-current' viewBox='0 0 24 24'>
    <path
      className='text-brand-primary'
      d='m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z'
    />
    <path
      className='text-brand-secondary'
      d='m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z'
    />
    <path
      className='text-gray-200'
      d='M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z'
    />
  </svg>
);

const ICON = [
  <ClipboardDocumentListIcon key={1} className='mr-4 h-7 w-7 text-blue-500' />,
  <QrCodeIcon key={12} className='mr-4 h-7 w-7 text-purple-500' />,
  <CubeTransparentIcon key={13} className='mr-4 h-7 w-7 text-orange-500' />,
];
const OPTIONS = [
  {
    text: 'I am whitelisted',
    type: 'whitelist',
  },
  {
    text: 'I am invited with codes',
    type: 'code',
  },
  {
    text: 'I want to unpack profile',
    type: 'product',
  },
];
const Step1 = () => {
  const { setStep, setType } = useSteps();

  return (
    <div className='flex px-4 '>
      <div className='mx-auto w-full'>
        <h2 className='text-md text-brand-dark mb-2 font-medium'>
          {/* Gain access to the {theme.name} Network (BETA) by claiming your Inception NFT */}
        </h2>
        <p className='mb-4 text-sm text-gray-500'></p>
        <div>
          <div className='mb-8 space-y-3'>
            {OPTIONS.map((_, i) => {
              return (
                <label
                  key={i}
                  className='relative block cursor-pointer hover:bg-bg_third '
                >
                  <input
                    onClick={() => {
                      setStep(2);
                      setType(_?.type);
                    }}
                    type='radio'
                    name='radio-buttons'
                    className='peer sr-only'
                  />
                  <div className='text-brand-dark hover:border-brand-primary flex items-center rounded border border-gray-300  p-4 text-sm font-medium shadow-sm duration-150 ease-in-out hover:border-2'>
                    {ICON[i]}
                    <span>{_?.text}</span>
                  </div>
                  <div
                    className='peer-checked:border-brand-primary pointer-events-none absolute inset-0 rounded border-2 border-transparent'
                    aria-hidden='true'
                  ></div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
