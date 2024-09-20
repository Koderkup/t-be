import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import './assets/styles/index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { routes } from './routes';
import { getPhoneNumber } from 'common';

const manifest =
  'https://s032vv3fc9h4.share.zrok.io/public/tonconnect-manifest.json';

WebApp.expand();
WebApp.ready();
if (!getPhoneNumber()) {
  WebApp.requestContact();
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifest}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);
