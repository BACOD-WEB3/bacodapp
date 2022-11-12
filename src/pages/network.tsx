import Distribution from '@/components/Distribution';
// import Graph from '@/components/Graph';
import Layout from '@/components/Layout';
import useFullMode from '@/hooks/useFullMode';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';

const Graph = dynamic(() => import('@/components/Graph'), {
  suspense: true,
  ssr: false,
});

export default function Network() {
  const { isFull, setFullMode } = useFullMode();
  return (
    <div>
      <div className={`${isFull ? '' : 'absolute'} ' -z-10`}>
        <Graph />

        {isFull && (
          <div className='absolute top-20 w-full bg-transparent text-center'>
            <button onClick={() => setFullMode(false)}>close full mode</button>
          </div>
        )}
      </div>
      <Layout
        fullMode
        rightMenu={
          <div>
            <Distribution />
          </div>
        }
      ></Layout>
    </div>
  );
}
