/* eslint-disable prettier/prettier */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project-imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
import PublicRoute from './PublicRoute';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthOtpVerification = Loadable(lazy(() => import('pages/auth/otp-verification')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthResetPasswordConfrim = Loadable(lazy(() => import('pages/auth/reset-password-conformation')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/login" replace />,
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <AuthLogin />
        </PublicRoute>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <PublicRoute>
          <AuthForgotPassword />
        </PublicRoute>
      ),
    },
    {
      path: 'otp-verification',
      element: (
        <PublicRoute>
          <AuthOtpVerification />
        </PublicRoute>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <PublicRoute>
          <AuthResetPassword />
        </PublicRoute>
      ),
    },
    {
      path: 'reset-password-conformation',
      element: (
        <PublicRoute>
          <AuthResetPasswordConfrim />
        </PublicRoute>
      ),
    },
  ],
};


export default LoginRoutes;
