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
import useTronContract from '@/hooks/useTronContract';
import useWallet from '@/hooks/useWallet';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { notify } from '@/components/Toast';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import ModalWallet from '@/components/Modal';
import useAuth from '@/hooks/useAuth';
import { CONTRACTS_SETUP } from '@/utils/network_config';

export default function Home() {
  // const { account, tronWeb, fetchAddressfromTronlink } = useWallet();
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  useEffect(() => {}, []);
  const { chain, chains } = useNetwork();
  // console.log(chain, chains, 'chains', connectors);

  const [showLogin, setShowLogin] = useState(false);
  const { checkinBalanceProfileFORCE } = useAuth();
  return (
    <div className='max-w-screen  bg- flex h-screen max-h-screen   flex-col justify-center'>
      <ModalWallet
        {...{
          showLogin,
          setShowLogin,
        }}
      />
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
        <span className='ts-m text-center text-6xl font-bold text-cyan-300'>
          BACODApp
          <br />- 1st CHAPTER : SELECTION -
        </span>
        <br />
        <br />
        <br />
        <br />

        <span className='ts-m text-center text-4xl font-bold text-orange-300'>
          Enter{' '}
        </span>
        <br />
        <div
          onClick={() => {
            console.log('out', isConnected, address, chain);
            if (chain !== CONTRACTS_SETUP.chainID) {
              setShowLogin(true);
            }
            if (!isConnected) {
              // console.log('in');
              //open modal
              setShowLogin(true);
            } else {
              checkinBalanceProfileFORCE();
            }

            //open modal

            //force change network
            //sign in and then ->

            // read nft balance -> /auth/onboarding

            // if (account) {
            //   router.push('/auth/onboarding');
            // } else {
            //   // notif
            //   fetchAddressfromTronlink();
            //   toast('Please connect to Tron Link', {
            //     // position: "top-right",
            //     // autoClose: 5000,
            //     // hideProgressBar: false,
            //     // closeOnClick: true,
            //     // pauseOnHover: true,
            //     // draggable: true,
            //     // progress: undefined,
            //     // theme: 'dark',
            //   });
            // }
          }}
          className=' flex  h-[150px]  w-[150px] cursor-pointer self-center overflow-hidden rounded-full'
        >
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

// function Test() {
//   const { account } = useWallet();
//   console.log(account, 'myaddress');

//   // if (typeof window !== undefined) {
//   //   // console.log(window, window?.web3, window?.webTron);
//   // }

//   const { contract, tronWeb } = useTronContract();

//   return (
//     <div className={styles.container}>
//       <div className='h-[200px] w-[200px] bg-red-500' />
//       <div style={{ width: 300, height: 300, background: 'red' }} />
//       <div>{account}</div>
//       <button
//         onClick={async () => {
//           console.log('click', account);
//           if (contract) {
//             tronWeb.setAddress(account);
//             console.log('contract', contract);
//             // view no input
//             // const tx = await contract.symbol.call().call();

//             // view with input
//             // const tx = await contract
//             //   .balanceOf('TAqxpzSZMF4BPLxhz9vufErnxg6BxFKHah')
//             //   .call();

//             // CALL no input
//             // const tx = await contract.createAccountMint().send();
//             // THIS WILL RETURN HASH TX alone

//             const num256 = 420 * 10 ** 18;
//             const fix1 = num256.toString();
//             const fix2 = '0x' + num256.toString(16);
//             console.log(num256, num256.toString(16), num256.toString());
//             // CALL with input
//             const tx = await contract
//               .mintProduct('420000000000000000000')
//               .send({
//                 // feeLimit: 100_000_000,
//                 // callValue: 0,
//                 // tokenId: 1000036,
//                 // tokenValue: 100,
//                 // shouldPollResponse: true,
//               });

//             // ---------------------------------------------------

//             // NOT FOR WEB CLIENT
//             // will pop up wallet to sign tx -> from builder
//             // var signedTx = await tronweb.trx.sign(tx)

//             // tronLink.request({method: 'tron_requestAccounts'})

//             // tronWeb.trx.sendRawTransaction(signedTransaction = [...]);
//             // tronWeb.trx.getAccountResources("TXPHCzmAmjyERtWES6EXTYqUPfJfQSzp2m");

//             // ---------------------------------------------------
//             // result
//             // console.log(tronWeb.toDecimal(tx), 'tx');
//             console.log(tx, 'tx');

//             // const tx = await window.tronWeb.transactionBuilder.triggerSmartContract(address, ABI, options, type, account);
//           }
//         }}
//       >
//         click
//       </button>
//     </div>
//   );
// }
