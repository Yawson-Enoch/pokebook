import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { AccentProvider } from './context/accent-provider';
import { router } from './routes';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pokebook</title>
      </Helmet>
      <AccentProvider>
        <RouterProvider router={router} />
      </AccentProvider>
    </HelmetProvider>
  );
}
