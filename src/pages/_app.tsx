// pages/_app.tsx

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Blog App</title>
        <meta name="description" content="A modern blog app using Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
