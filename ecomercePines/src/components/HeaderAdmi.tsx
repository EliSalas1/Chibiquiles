"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function HeaderAdmi() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/Login");
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        Gestión de Ecommerce "Chibiquiles"
      </h1>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span className="text-sm font-medium">Admin</span>
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <User className="w-4 h-4 text-yellow-600" />
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 text-gray-500" /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}


// import { useNavigate } from "react-router-dom";

// export default function HeaderAdmi() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("rol");
//     navigate("/Login");
//   };

//   return (
//     <header>
//       {/* otros elementos */}
//       <button
//         onClick={handleLogout}
//         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Cerrar sesión
//       </button>
//     </header>
//   );
// }