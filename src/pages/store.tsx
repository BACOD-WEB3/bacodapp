import Button from '@/components/Button';
import Layout from '@/components/Layout';
import Overview from '@/components/Overview';
import useContractX from '@/hooks/useContractX';
import useTronContract, { getContractAddress } from '@/hooks/useTronContract';
import { CONTRACTS_SETUP } from '@/utils/network_config';
import { utils } from 'ethers';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Store({}) {
  return (
    <Layout rightMenu={<Overview />}>
      <ListProducts />
    </Layout>
  );
}

const LIST_PRODUCT = [
  {
    title: 'Subscriptions',
    id: 99,
    price: 30000000000000000001,
    socialPoints: 100,
    uri: 'https://raw.githubusercontent.com/free-fork/metadata/master/products-sh/subs',
    image:
      'https://thumbs.dreamstime.com/b/gold-shield-shape-icon-d-golden-emblem-sign-isolated-black-background-symbol-security-power-protection-badge-graphic-design-107569168.jpg',
    category: 'badge',
    // nftAddress: 'TGRpBpf5mHMAVYZnVynu9vXpiUYvW2SXMW',
  },
  {
    title: 'Suprise GiftCodes',
    price: 200000000000000000001,
    id: 98,
    socialPoints: 700,
    uri: 'https://raw.githubusercontent.com/free-fork/metadata/master/products-sh/gc-2x',
    image:
      'https://media.istockphoto.com/id/1289735749/photo/gift-card-with-tied-bow.jpg?s=612x612&w=0&k=20&c=9e_G99egsS0qcoxgeW6vlyvM5HSAiXU9LoEwMhqUUfk=',

    category: 'giftcodes',
    // nftAddress: 'TGizrkGndwqTiaaYx8kcLjY67hHo4bQTfU',
  },
  // {
  //   title: 'GiftCodes 10x',
  //   price: 880000000000000000000,
  //   id: 3,
  //   socialPoints: 8800,
  //   uri: 'https://raw.githubusercontent.com/free-fork/metadata/master/products-sh/gc-10x',
  //   image:
  //     'https://media.istockphoto.com/id/1289735749/photo/gift-card-with-tied-bow.jpg?s=612x612&w=0&k=20&c=9e_G99egsS0qcoxgeW6vlyvM5HSAiXU9LoEwMhqUUfk=',

  //   category: 'giftcodes',
  //   locked: true,

  //   nftAddress: 'TGizrkGndwqTiaaYx8kcLjY67hHo4bQTfU',
  // },
  {
    title: 'Mystery Box - ',
    price: 8888000000000000000000,
    id: 777,
    socialPoints: 88000,
    uri: 'https://raw.githubusercontent.com/free-fork/metadata/master/products-sh/mystery-box',
    image:
      'https://img.freepik.com/premium-vector/shine-box-cartoon-style-black-background-open-gift-box-vector-illustration-stock-image_213497-68.jpg?w=2000',
    locked: true,
    category: 'box',
    nftAddress: 'TGizrkGndwqTiaaYx8kcLjY67hHo4bQTfU',
  },
  { title: 'Boost - phase III', locked: true, id: 999 },
  { title: 'Profile Packs', locked: true, id: 4 },
  { title: 'Energy - phase III', locked: true, type: 'game', id: 991 },
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
  const { callContract: callApproveX } = useContractX('fakeUSD');
  const { callContract: callPurchaseX } = useContractX('store');

  const [loading, setLoading] = useState(false);

  //
  const buyProduct = async () => {
    setLoading(true);
    const id = toast.loading('Processing order, please wait...');

    try {
      const tx1 = await callApproveX('approve', [
        CONTRACTS_SETUP?.store.address,
        Number(item?.price * 2).toString(),
      ]);

      console.log(tx1, 'tx1 ?');
      // error hooks
      const tx2 = await callPurchaseX('purchaseProduct', [item?.id]);
      console.log(tx2, 'tx2 ?');
      setLoading(false);
      toast.update(id, {
        render: `Sucess minting profile, hash tx: ${tx2}`,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
      toast.update(id, {
        render: `Failed: ${error}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className='col-span-1 m-1 mt-0 mb-2 rounded-md bg-blue-500 p-5'>
      <div className='h-[200px]'>
        {item?.image && (
          <img alt='' src={item?.image} className='h-full w-full rounded-md ' />
        )}
      </div>
      <br />

      <b className=''>{item.title}</b>
      <br />

      {item?.socialPoints && (
        <span className='text-black'>
          {Number(item?.socialPoints)} Points
          <br />
        </span>
      )}
      {item?.category && (
        <b className='text-orange-400'>
          {item?.category}
          <br />
        </b>
      )}

      <div className='flex w-full items-center justify-between  '>
        {item?.price && (
          <b className='flex align-middle  text-xl  text-green-400'>
            {Number(item?.price) / 1000000000000000000} TUSD
          </b>
        )}
        {!item?.locked && (
          <Button
            disabled={loading}
            onClick={buyProduct}
            className={`float-right border bg-red-400 px-10`}
          >
            {loading ? 'Minting...' : 'Buy'}
          </Button>
        )}
      </div>
    </div>
  );
};
