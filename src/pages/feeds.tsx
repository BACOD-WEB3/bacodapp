import Layout from '@/components/Layout';
import CreatePost from '@/components/Post/CreatePost';
import PostItem from '@/components/Post/PostItem';
import Search from '@/components/Search';
import Trends from '@/components/Trends';
import usePostFeed, { useLoadFeed } from '@/hooks/useLoadFeed';
import Head from 'next/head';
import Image from 'next/image';
import { useContractRead } from 'wagmi';

export default function Feeds() {
  const { all_feeds } = useLoadFeed();
  const { loading } = usePostFeed();

  // useContractRead()

  return (
    <Layout
      rightMenu={
        <div className='pl-4'>
          <Search />
          <br />
          <Trends />
        </div>
      }
    >
      <div className='px-2'>
        <CreatePost />

        <br />
        <div className='text-[11px] text-red-500'>
          *Load speed is currently slow, improving on 2nd phase as this feature
          isn't priority for 1st phase
        </div>

        <br />
        {!!loading && <div>Loading...</div>}
        {all_feeds.map((post, i) => (
          <PostItem key={post.id} {...{ post, index: i }} />
        ))}
      </div>
    </Layout>
  );
}
