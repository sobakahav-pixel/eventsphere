import { Outlet, ScrollRestoration } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
