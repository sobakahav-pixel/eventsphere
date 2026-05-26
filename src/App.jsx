import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProPage from './pages/ProPage';
import PricingPage from './pages/PricingPage';
import VendorPage from './pages/VendorPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import CabinetPage from './pages/CabinetPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,           element: <HomePage /> },
      { path: 'catalog',       element: <CatalogPage /> },
      { path: 'vendor/:id',    element: <VendorPage /> },
      { path: 'login',         element: <LoginPage /> },
      { path: 'register',      element: <RegisterPage /> },
      { path: 'pro',           element: <ProPage /> },
      { path: 'pro/pricing',   element: <PricingPage /> },
      { path: 'auth/callback',    element: <AuthCallbackPage /> },
      { path: 'cabinet',          element: <CabinetPage /> },
      { path: 'forgot-password',  element: <ForgotPasswordPage /> },
      { path: 'reset-password',   element: <ResetPasswordPage /> },
      { path: '*',             element: <NotFoundPage /> },
    ],
  },
], { basename: '/eventsphere' });

export default function App() {
  return <RouterProvider router={router} />;
}
