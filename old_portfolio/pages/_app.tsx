import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>malekd5 portfolio</title>
        <meta property='og:title' content='malekd5 portfolio' key='title' />
        <meta name='description' content='Malekd5 personal portfolio' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}
