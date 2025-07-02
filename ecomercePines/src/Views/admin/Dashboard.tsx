"use client";

import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import HeaderAdmi from "../../components/HeaderAdmi";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
} from "lucide-react";

type Pedido = {
  id: string;
  cliente_nombre: string;
  estado: string;
  total: number;
};

type ProductoPopular = {
  producto: string;
  categoria: string;
  precio: number;
};

type DashboardData = {
  ingresosTotales: number;
  totalPedidos: number;
  totalProductos: number;
  totalClientes: number;
  pedidosRecientes: Pedido[];
  productosPopulares: ProductoPopular[];
};

export default function Dashboard() {
  const [activeSection] = useState("resumen");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "bg-green-100 text-green-800";
      case "Enviado":
        return "bg-blue-100 text-blue-800";
      case "Procesando":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const icons = {
    "Ingresos Totales": <DollarSign className="w-5 h-5 text-gray-600" />,
    "Pedidos": <ShoppingCart className="w-5 h-5 text-gray-600" />,
    "Productos": <Package className="w-5 h-5 text-gray-600" />,
    "Clientes": <Users className="w-5 h-5 text-gray-600" />,
  };

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard`);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-10">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmi />

        <main className="flex-1 p-10 overflow-auto">
          {activeSection === "resumen" && dashboardData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {[
                  {
                    title: "Ingresos Totales",
                    value: `$${dashboardData.ingresosTotales.toFixed(2)}`,
                    change: "+12.5% desde el mes pasado",
                  },
                  {
                    title: "Pedidos",
                    value: `${dashboardData.totalPedidos}`,
                    change: "+8.2% desde el mes pasado",
                  },
                  {
                    title: "Productos",
                    value: `${dashboardData.totalProductos}`,
                    change: "+3 nuevos productos",
                  },
                  {
                    title: "Clientes",
                    value: `${dashboardData.totalClientes}`,
                    change: "+7.4% desde el mes pasado",
                  },
                ].map((card, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500 font-medium">
                        {card.title}
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {icons[card.title as keyof typeof icons]}
                      </div>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {card.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{card.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pedidos Recientes */}
                <div className="bg-white border border-gray-200 rounded-xl">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Pedidos Recientes
                    </h2>
                    <p className="text-sm text-gray-400">
                      Últimos 5 pedidos realizados
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 uppercase text-xs border-b border-gray-100">
                          <th className="px-6 py-3">ID</th>
                          <th className="px-6 py-3">Cliente</th>
                          <th className="px-6 py-3">Estado</th>
                          <th className="px-6 py-3">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.pedidosRecientes.map((order, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 text-gray-900 font-medium">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {order.cliente_nombre}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(
                                  order.estado
                                )}`}
                              >
                                {order.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              ${order.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Productos Populares */}
                <div className="bg-white border border-gray-200 rounded-xl">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Productos Populares
                    </h2>
                    <p className="text-sm text-gray-400">
                      Productos más vendidos
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 uppercase text-xs border-b border-gray-100">
                          <th className="px-6 py-3">Producto</th>
                          <th className="px-6 py-3">Categoría</th>
                          <th className="px-6 py-3">Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.productosPopulares.map((product, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 text-gray-900 font-medium">
                              {product.producto}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {product.categoria}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              ${product.precio}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
