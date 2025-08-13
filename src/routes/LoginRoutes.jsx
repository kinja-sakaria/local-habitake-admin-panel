/* eslint-disable prettier/prettier */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project-imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthOtpVerification = Loadable(lazy(() => import('pages/auth/otp-verification')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthResetPasswordConfrim = Loadable(lazy(() => import('pages/auth/reset-password-conformation')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/login" replace />
        },
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'otp-verification',
          element: <AuthOtpVerification />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'reset-password-conformation',
          element: <AuthResetPasswordConfrim />
        }
      ]
    }
  ]
};

export default LoginRoutes;