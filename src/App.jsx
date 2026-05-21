import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProPage from './pages/ProPage';
import PricingPage from './pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,           element: <HomePage /> },
      { path: 'catalog',       element: <CatalogPage /> },
      { path: 'login',         element: <LoginPage /> },
      { path: 'register',      element: <RegisterPage /> },
      { path: 'pro',           element: <ProPage /> },
      { path: 'pro/pricing',   element: <PricingPage /> },
      { path: '*',             element: <NotFoundPage /> },
    ],
  },
], { basename: '/eventsphere' });

export default function App() {
  return <RouterProvider router={router} />;
}
