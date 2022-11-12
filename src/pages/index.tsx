import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Lottie from 'react-lottie-player';
import landingGraph from '../../public/lottie/landing-graph.json';
// import buttonPink from '../../public/lottie/button-pink.json';
import buttonPink from '../../public/lottie/glow-button.json';
import bgdot from '../../public/lottie/bg-dot.json';
import matrix from '../../public/lottie/matrix.json';

export default function Home() {
  //if loggedin -> router push to feeds

  // max-width
  return (
    <div className='max-w-screen  bg- flex h-screen max-h-screen   flex-col justify-center'>
      <div className='absolute h-screen w-screen  '>
        <div className='flex h-full w-full justify-center  align-middle'>
          <Lottie loop play animationData={bgdot} />
        </div>
      </div>
      <div className='absolute h-screen w-screen  '>
        <div className='flex h-full w-full justify-center  align-middle'>
          <Lottie loop play speed={1.7} animationData={matrix} />
        </div>
      </div>
      <div className='absolute h-screen w-screen  backdrop-blur-sm'></div>
      <div className='z-20 flex flex-col self-center align-middle '>
        <span className='ts-m text-center text-6xl font-bold text-cyan-500'>
          ShuoCIAL NFT
          <br />- 1st PHASE -
        </span>
        <br />
        <br />
        <br />
        <br />

        <span className='ts-m text-center text-4xl font-bold text-orange-300'>
          Enter{' '}
        </span>
        <br />
        <div className=' flex  h-[150px]  w-[150px] cursor-pointer self-center overflow-hidden rounded-full'>
          <Lottie
            className=' scale-[300%] '
            loop
            play
            speed={0.7}
            animationData={buttonPink}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
