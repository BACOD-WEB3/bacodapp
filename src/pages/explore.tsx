import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';

export default function () {
  return (
    <Layout>
      <div style={{ width: 300, height: 300, background: 'red' }} />
      Feeds
    </Layout>
  );
}
