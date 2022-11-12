import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';

export default function Notification() {
  return (
    <Layout>
      {[1, 1, 1, 1, 1].map((item, i) => (
        <div className='m-2 rounded-md border p-4'>0x ...</div>
      ))}
    </Layout>
  );
}
