import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserAuth } from '../context/AuthContext';
import PromoRegistro from '../components/PromoRegistro';

export default function Layout() {
  const { user } = UserAuth();
  const location = useLocation();

  // Vistas donde sí queremos mostrar el banner
  const publicPaths = ["/", "/Top", "/Pines", "/Llaveros", "/Blog"];

  const isPublicPage = publicPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      <Header />
      {/* Mostrar solo si no hay usuario y estamos en una ruta pública */}
      {!user && isPublicPage && <PromoRegistro />}
      
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
