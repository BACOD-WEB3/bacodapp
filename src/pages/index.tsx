import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  //if loggedin -> router push to feeds
  return (
    <div>
      <div style={{ width: 300, height: 300, background: 'red' }} />
      will be landing temp, load here and detect wallet
      <Link href='/profile'>go</Link>
    </div>
  );
}
