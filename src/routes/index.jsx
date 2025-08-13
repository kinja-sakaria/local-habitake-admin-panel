// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorRoutes from './ErrorRoutes';

const router = createBrowserRouter([MainRoutes, LoginRoutes, ErrorRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
