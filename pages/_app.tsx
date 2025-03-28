import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/clerk-react';
('use client');

import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || '';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const GA_TRACKING_ID = 'G-TECW05ZKH4';

const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      });
                    `,
        }}
      />
    </>
  );
};

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <div className={inter.className}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/ui">
        <Toaster position="top-right" />
        <GoogleAnalytics />
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
}

export default appWithTranslation(App);
