import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { AccentProvider } from './context/accent-provider';
import { router } from './routes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pokebook</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <AccentProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AccentProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
