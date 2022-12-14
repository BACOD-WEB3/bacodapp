import Button from '@/components/Button';
import Layout from '@/components/Layout';
import useSteps from '@/hooks/useSteps';
import { useEffect, useState } from 'react';

const StepsProgress = () => {
  const { setStep, step } = useSteps();

  return (
    <>
      <p className='text-center text-3xl font-semibold'>Join the network</p>
      <div className='flex w-full px-4 pt-12 pb-12'>
        <div className='mx-auto w-full'>
          <div className='relative'>
            <div
              className='absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-green-200'
              aria-hidden='true'
            />
            <ul className='relative flex w-full justify-between'>
              {Array.from({ length: 3 }, (_, i) => i + 1).map(
                (value, index) => {
                  return (
                    <li
                      key={value}
                      className='cursor-pointer '
                      onClick={() => {
                        if (step > index) {
                          setStep(value);
                        }
                      }}
                    >
                      <span
                        className={`border font-semibold  ${
                          step > index
                            ? 'bg-green-400 text-white'
                            : 'bg-slate-100 text-slate-500'
                        } flex h-7 w-7 items-center justify-center rounded-full text-xs`}
                      >
                        {value}
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepsProgress;
