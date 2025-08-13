// ErrorRoutes.tsx
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const NotFound = Loadable(lazy(() => import('pages/NotFound')));

const ErrorRoutes = {
  path: '*',
  element: <NotFound />
};

export default ErrorRoutes;
