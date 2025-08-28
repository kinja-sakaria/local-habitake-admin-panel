// MainRoutes.tsx
import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const Setting = Loadable(lazy(() => import('pages/setting/setting')));
const Support = Loadable(lazy(() => import('pages/support/support')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Transaction = Loadable(lazy(() => import('pages/transaction/transaction')));
const Subscription = Loadable(lazy(() => import('pages/subscription/subscription')));
const Notification = Loadable(lazy(() => import('pages/notification/notification')));
const UserManagement = Loadable(lazy(() => import('pages/user-management/usermanagement')));
const AIModelTraining = Loadable(lazy(() => import('pages/ai-model-training/aiModelTraining')));
const PropertyManagement = Loadable(lazy(() => import('pages/property-management/propertymanagement')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    // {
    //   index: true,
    //   element: <Navigate to="/dashboard" replace />
    // },
    {
      path: 'dashboard',
      element: <DashboardDefault />,
    },
    {
      path: 'user-management',
      element: <UserManagement />,
    },
    {
      path: 'property-management',
      element: <PropertyManagement />,
    },
    {
      path: 'subscription',
      element: <Subscription />,
    },
    {
      path: 'setting',
      element: <Setting />,
    },
    {
      path: 'transaction',
      element: <Transaction />,
    },
    {
      path: 'ai-model-training',
      element: <AIModelTraining />,
    },
    {
      path: 'support',
      element: <Support />,
    },
    {
      path: 'notification',
      element: <Notification />,
    },
  ],
};

export default MainRoutes;
