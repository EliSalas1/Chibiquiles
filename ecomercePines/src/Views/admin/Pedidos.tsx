"use client";

import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import HeaderAdmi from "../../components/HeaderAdmi";

type Pedido = {
  id: number;
  cliente: string;
  fecha: string;
  estado: string;
  total: number;
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item: any) => ({
          id: item.id,
          cliente: item.cliente_nombre,
          fecha: new Date(item.created_at).toLocaleDateString(),
          estado: item.estado,
          total: item.total,
        }));
        setPedidos(mapped);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando pedidos:", error);
        setLoading(false);
      });
  }, []);

  // Función para devolver clases CSS según estado
  const getStatusClasses = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "completado":
        return "bg-green-100 text-green-800";
      case "procesando":
        return "bg-yellow-100 text-yellow-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      case "enviado":
        return "bg-blue-100 text-blue-800";
      case "pendiente":
        return "bg-yellow-50 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <HeaderAdmi />

        <main className="flex-1 p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Pedidos</h2>
            <p className="text-gray-500 text-sm">
              Estados de los pedidos
            </p>
          </div>

          {loading ? (
            <div className="text-gray-500">Cargando...</div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 text-left">ID</th>
                      <th className="px-6 py-3 text-left">Cliente</th>
                      <th className="px-6 py-3 text-left">Fecha</th>
                      <th className="px-6 py-3 text-left">Estado</th>
                      <th className="px-6 py-3 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pedidos.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{order.cliente}</td>
                        <td className="px-6 py-4 text-gray-700">{order.fecha}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusClasses(order.estado)}`}
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
          )}
        </main>
      </div>
    </div>
  );
}
