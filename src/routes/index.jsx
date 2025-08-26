import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorRoutes from './ErrorRoutes';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([MainRoutes, LoginRoutes, ErrorRoutes]);

export default router;
