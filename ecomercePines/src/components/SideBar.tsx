import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart } from 'lucide-react';

export default function SideBar() {
  const location = useLocation();

  const items = [
    { label: 'Resumen', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Productos', path: '/productos', icon: <Package className="w-4 h-4" /> },
    { label: 'Pedidos', path: '/pedidos', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'Clientes', path: '/clientes', icon: <Users className="w-4 h-4" /> },
    { label: 'Análisis', path: '/analisis', icon: <BarChart className="w-4 h-4" /> },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 text-center border-b border-slate-700">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
          <img
            src="/logo.webp"
            alt="Logo Chibiquiles"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold">Chibiquiles</h2>
        <p className="text-sm text-slate-300">
          Sabores de corazón, coleccionables de profesión
        </p>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map(({ label, path, icon }) => {
            const isActive = location.pathname === path;

            return (
              <li key={label}>
                <Link
                  to={path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors duration-150 ${
                    isActive
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}