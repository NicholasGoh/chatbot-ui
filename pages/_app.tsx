import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/clerk-react';

const inter = Inter({ subsets: ['latin'] });
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || '';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <div className={inter.className}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/ui">
        <Toaster />
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
}

export default appWithTranslation(App);
