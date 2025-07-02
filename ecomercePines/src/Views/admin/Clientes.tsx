"use client";

import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import HeaderAdmi from "../../components/HeaderAdmi";

type Cliente = {
  id: number;
  nombre: string;
  email: string;
  estado: string;
  pedidos: number;
  totalGastado: string;
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clientes`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando clientes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmi />
        <main className="flex-1 p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Clientes
            </h2>
            <p className="text-gray-500 text-sm">
              Clientes registrados en Chibiquiles
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
                      <th className="px-6 py-3 text-left">
                        Nombre del Cliente
                      </th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Estado</th>
                      <th className="px-6 py-3 text-left">Pedidos</th>
                      <th className="px-6 py-3 text-left">Total Gastado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {clientes.map((cliente) => (
                      <tr
                        key={cliente.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          #{cliente.id}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {cliente.nombre}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {cliente.email}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {cliente.estado}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {cliente.pedidos}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          ${cliente.totalGastado}
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
