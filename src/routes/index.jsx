import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorRoutes from './ErrorRoutes';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const router = createBrowserRouter([
  {
    ...LoginRoutes,
    element: <PublicRoute>{LoginRoutes.element}</PublicRoute>,
  },
  // protected routes
  {
    ...MainRoutes,
    element: <ProtectedRoute>{MainRoutes.element}</ProtectedRoute>,
  },
  ErrorRoutes,
]);

export default router;
