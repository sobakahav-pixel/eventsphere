import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage        = lazy(() => import('./pages/HomePage'));
const CatalogPage     = lazy(() => import('./pages/CatalogPage'));
const VendorPage      = lazy(() => import('./pages/VendorPage'));
const LoginPage       = lazy(() => import('./pages/LoginPage'));
const RegisterPage    = lazy(() => import('./pages/RegisterPage'));
const ProPage         = lazy(() => import('./pages/ProPage'));
const PricingPage     = lazy(() => import('./pages/PricingPage'));
const AuthCallbackPage   = lazy(() => import('./pages/AuthCallbackPage'));
const CabinetPage        = lazy(() => import('./pages/CabinetPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage  = lazy(() => import('./pages/ResetPasswordPage'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return <div className="auth-page"><div style={{ fontSize: 40, opacity: .4 }}>⏳</div></div>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,           element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: 'catalog',       element: <Suspense fallback={<PageLoader />}><CatalogPage /></Suspense> },
      { path: 'vendor/:id',    element: <Suspense fallback={<PageLoader />}><VendorPage /></Suspense> },
      { path: 'login',         element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
      { path: 'register',      element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
      { path: 'pro',           element: <Suspense fallback={<PageLoader />}><ProPage /></Suspense> },
      { path: 'pro/pricing',   element: <Suspense fallback={<PageLoader />}><PricingPage /></Suspense> },
      { path: 'auth/callback',    element: <Suspense fallback={<PageLoader />}><AuthCallbackPage /></Suspense> },
      { path: 'cabinet',          element: <Suspense fallback={<PageLoader />}><CabinetPage /></Suspense> },
      { path: 'forgot-password',  element: <Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense> },
      { path: 'reset-password',   element: <Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense> },
      { path: '*',             element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
], { basename: '/eventsphere' });

export default function App() {
  return <RouterProvider router={router} />;
}
