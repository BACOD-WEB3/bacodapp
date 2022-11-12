import Layout from '@/components/Layout';
import Overview from '@/components/Overview';
import Head from 'next/head';
import Image from 'next/image';

export default function Store({}) {
  return (
    <Layout rightMenu={<Overview />}>
      <ListProducts />
    </Layout>
  );
}

const LIST_PRODUCT = [
  { title: 'Subscriptions' },
  { title: 'GiftCodes 2x' },
  { title: 'GiftCodes 10x' },
  { title: 'Boost Visibility' },
  { title: 'Unpack Profile', sell: false },
  { title: 'Energy', sell: false, type: 'game' },
];

const ListProducts = () => {
  return (
    <div className='grid xl:grid-cols-2'>
      {LIST_PRODUCT.map((item, i) => (
        <ProductItem key={i} {...{ item }} />
      ))}
    </div>
  );
};

const ProductItem = ({ item }) => {
  return (
    <div className='col-span-1 m-1  rounded-md bg-red-400 p-5'>
      <div className='h-[300px]' />
      {item.title}
    </div>
  );
};
