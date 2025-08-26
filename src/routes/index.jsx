// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorRoutes from './ErrorRoutes';

const router = createBrowserRouter([MainRoutes, LoginRoutes, ErrorRoutes]);

export default router;
