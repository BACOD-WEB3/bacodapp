import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import ProgressBar from '@badrap/bar-of-progress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
      <div className='font-mono'>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
