import Layout from '@/components/Layout';
import CreatePost from '@/components/Post/CreatePost';
import PostItem from '@/components/Post/PostItem';
import Search from '@/components/Search';
import Trends from '@/components/Trends';
import Head from 'next/head';
import Image from 'next/image';

const MOCK_Post = [
  {
    id: 1,
    title: `And we finalized!

    Happy merge all. This is a big moment for the Ethereum ecosystem. Everyone who helped make the merge happen should feel very proud today.`,
    date: '5h ago',
    commentCount: 5,
    shareCount: 2,
  },
  {
    id: 2,
    title: "So you've bought coffee... now what?",
    date: '2h ago',
    commentCount: 3,
    shareCount: 2,
  },
  {
    id: 3,
    title: `And we finalized!

    Happy merge all. This is a big moment for the Ethereum ecosystem. Everyone who helped make the merge happen should feel very proud today.`,
    date: '5h ago',
    commentCount: 5,
    shareCount: 2,
  },
  {
    id: 4,
    title: "So you've bought coffee... now what?",
    date: '2h ago',
    commentCount: 3,
    shareCount: 2,
  },
  {
    id: 3,
    title: `And we finalized!

    Happy merge all. This is a big moment for the Ethereum ecosystem. Everyone who helped make the merge happen should feel very proud today.`,
    date: '5h ago',
    commentCount: 5,
    shareCount: 2,
  },
  {
    id: 4,
    title: "So you've bought coffee... now what?",
    date: '2h ago',
    commentCount: 3,
    shareCount: 2,
  },
  {
    id: 3,
    title: `And we finalized!

    Happy merge all. This is a big moment for the Ethereum ecosystem. Everyone who helped make the merge happen should feel very proud today.`,
    date: '5h ago',
    commentCount: 5,
    shareCount: 2,
  },
  {
    id: 4,
    title: "So you've bought coffee... now what?",
    date: '2h ago',
    commentCount: 3,
    shareCount: 2,
  },
];
export default function Feeds() {
  return (
    <Layout
      rightMenu={
        <div className='p-4'>
          <Search />
          <br />
          <Trends />
        </div>
      }
    >
      <div className='p-2'>
        <CreatePost />
        <br />
        {MOCK_Post.map((post, i) => (
          <PostItem key={post.id} {...{ post, index: i }} />
        ))}
      </div>
    </Layout>
  );
}
