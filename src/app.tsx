import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { AccentProvider } from './context/accent-provider';
import { router } from './routes';

const TIME_TO_REMAIN_IN_CACHE_STORE = 1000 * 60 * 60 * 24 * 7; // 7days

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* set to the default maxAge on the `persistQueryClient which is 24 hours` 
      - stored cache will be discarded after 24 hours
      - gcTime` should be same or higher than the maxAge set on `persistQueryClient`
      - the maximum allowed gcTime is about 24 days __ check "How It Works" section of https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient#persistqueryclientsave
      */
      gcTime: TIME_TO_REMAIN_IN_CACHE_STORE,
      /* so all queries stay fresh
      - not necessary as it will not refetch as there will be data in the cache store 
      - just serves as a good fallback
       */
      staleTime: Infinity,
    },
  },
});

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pokebook</title>
      </Helmet>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: localStoragePersister,
          maxAge: TIME_TO_REMAIN_IN_CACHE_STORE,
        }}
      >
        <AccentProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AccentProvider>
      </PersistQueryClientProvider>
    </HelmetProvider>
  );
}
