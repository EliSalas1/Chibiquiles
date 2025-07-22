import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FaFacebookF, FaInstagram, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  const { user, signOut } = UserAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isActive = (route: string) =>
    path === route ? "text-orange-600" : "hover:text-orange-600";

  const handleCarritoClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <header className="flex flex-col justify-between items-center w-full text-base mx-auto font-(family-name:Quicksand, Montserrat)">
      {/* Top bar */}
      <section className="px-4 w-full bg-gray-50">
        <div className="flex flex-row justify-between items-center max-w-7xl mx-auto py-3">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              <a href={`mailto:${user ? user.correo : "soporte@chibiquiles.com"}`} className="text-black">
                {user ? user.correo : "soporte@chibiquiles.com"}
              </a>
            </span>
            <span className="text-gray-400">|</span>
            <span>Envío gratis a partir de $799</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="https://facebook.com/chibiquiles" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/chibiquiles" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-4 h-4" />
            </a>
            <span className="text-gray-400">|</span>

            {/* Menú usuario */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-black cursor-pointer hover:text-orange-500">
                <FaUser className="w-4 h-4" aria-hidden="true" />
                {user?.nombre || ""}
              </button>
              <div className="absolute z-10 bg-white border rounded shadow-md right-0 hidden group-hover:block min-w-[150px] text-sm">
                {user ? (
                  <button
                    onClick={signOut}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-black hover:text-orange-500"
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <>
                    <Link
                      to="/Login"
                      className="block px-4 py-2 text-black hover:text-orange-500 hover:bg-gray-100"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/Registro"
                      className="block px-4 py-2 text-black hover:text-orange-500 hover:bg-gray-100"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menú principal */}
      <section className="w-full flex-row mx-auto px-4">
        <div className="flex flex-row justify-between max-w-7xl items-center mx-auto py-3">
          <div>
            <img src="/logo.webp" alt="Logo" className="h-16" />
          </div>

          <button
            className="md:hidden text-2xl text-black"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FaBars />
          </button>

          <nav className={`${isNavOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-6 md:items-center font-medium text-black`}>
            <Link to="/" className={isActive("/")}>HOME</Link>
            <Link to="/Top" className={isActive("/Top")}>TOP</Link>

            <div className="relative group">
              <button
                className={`cursor-pointer ${path.includes("/Pines") || path.includes("/Llaveros") ? "text-orange-500" : "hover:text-orange-500"}`}
              >
                CATEGORÍAS
              </button>
              <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded z-10 w-full">
                <Link to="/Pines" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-orange-500">
                  Pines
                </Link>
                <Link to="/Llaveros" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-orange-500">
                  Llaveros
                </Link>
              </div>
            </div>

            <Link to="/Blog" className={isActive("/Blog")}>BLOG</Link>
          </nav>

          <div className="flex items-center gap-6">
            <a href="/Carrito" onClick={handleCarritoClick}>
              <div className="relative cursor-pointer">
                <FaShoppingCart aria-hidden="true" className="text-black text-xl" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Modal para usuarios no registrados */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">¡Inicia sesión o regístrate!</h2>
            <p className="mb-4">Para agregar productos al carrito, necesitas tener una cuenta.</p>
            <div className="flex justify-center gap-4">
              <Link to="/Login" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Iniciar sesión
              </Link>
              <Link to="/Registro" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Registrarse
              </Link>
            </div>
            <button onClick={() => setShowLoginModal(false)} className="mt-4 text-sm text-gray-500 hover:underline">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
