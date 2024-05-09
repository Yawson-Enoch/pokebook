import { createBrowserRouter, Outlet } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import Error from './error';
import Home from './home';
import Pokemons from './pokemons';

export const router = createBrowserRouter([
  {
    path: '/',
    /* `element` and a child `Outlet` is used here only to make `QueryParamProvider` work 
    - wrapping `QueryParamProvider` around `<RouterProvider router={router} />` in app.tsx does not work
    - reference: https://github.com/pbeshai/use-query-params/issues/271
    */
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Outlet />
      </QueryParamProvider>
    ),
    errorElement: <Error />, // handles 404 and route errors
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/pokemons',
        element: <Pokemons />,
      },
    ],
  },
]);
