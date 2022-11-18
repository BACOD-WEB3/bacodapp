import React from 'react';
import Lottie from 'react-lottie-player';
import LottieLoader from '../../../public/lottie/loading1.json';

export const Loader = ({ className = '' }) => (
  <Lottie
    loop
    play
    animationData={LottieLoader}
    className={` md:scale-50 ${className} `}
  />
);

export default function LoadingScreen() {
  return (
    <div className='absolute z-30 flex h-screen w-screen justify-center bg-transparent align-middle backdrop-blur-sm'>
      <Loader />
    </div>
  );
}
