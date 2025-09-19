import { createBrowserRouter } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ErrorRoutes from './ErrorRoutes';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    ...LoginRoutes,
  },
  {
    ...MainRoutes,
    element: <ProtectedRoute>{MainRoutes.element}</ProtectedRoute>,
  },
  ErrorRoutes,
]);

export default router;
