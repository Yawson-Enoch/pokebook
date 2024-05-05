import { createBrowserRouter } from 'react-router-dom';

import Error from './error';
import Home from './home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />, // handles 404 and route errors
  },
]);
