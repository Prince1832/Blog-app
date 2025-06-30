import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>My Blog App</title>
                <meta name="description" content="A modern blog app using Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/*Google tag (gtag.js) */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-F28L27CKN5"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-F28L27CKN5');
                    `,
                }}
            />

            <Component {...pageProps} />
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}
