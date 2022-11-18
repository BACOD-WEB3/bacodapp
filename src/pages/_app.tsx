import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import ProgressBar from '@badrap/bar-of-progress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingScreen from '@/components/Loading/LoadingScreen';
import useAuth from '@/hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import usePostFeed from '@/hooks/useLoadFeed';
import { useAccount, WagmiConfig } from 'wagmi';

import { client } from '../utils/wagmi';

const progress = new ProgressBar({
  size: 1,
  color: '#AAF7EC',
  delay: 100,
  className: 'progress',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', progress.start);
    router.events.on('routeChangeComplete', progress.finish);
    router.events.on('routeChangeError', progress.finish);
  }, [router.events]);

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem={false}
      disableTransitionOnChange
    >
      <WagmiConfig client={client}>
        <LoadAuthComponent />
        <ToastContainer theme='dark' />
        <div className='font-mono'>
          {/* {loadingProfileCheck ? (
            <LoadingScreen />
          ) : ( */}
          <Component {...pageProps} />
          {/* )} */}
        </div>
      </WagmiConfig>
    </ThemeProvider>
  );
}

const LoadAuthComponent = () => {
  const { isLoggedin, checkinBalanceProfileFORCE } = useAuth();
  const router = useRouter();
  const { address } = useAccount();
  useEffect(() => {
    if (isLoggedin) {
      router.push('/profile');
    }
  }, [isLoggedin]);

  // console.log(address, 'address');
  useEffect(() => {
    if (!address) {
      router.push('/');
    }
  }, [address]);

  return <div />;
};
