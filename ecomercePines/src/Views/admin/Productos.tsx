"use client";

import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import HeaderAdmi from "../../components/HeaderAdmi";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { exportProductsToExcel } from "../../utils/exportToExcel";
import ProductForm, { ProductFormValues } from "../../components/ProductForm";
import Toast from "../../components/Toast";
import ConfirmModal from "../../components/ConfirmModal";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  estado: string;
  imagen_path: string;
  stock: number;
  precio: number;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showConfirm, setShowConfirm] = useState<{ id: number } | null>(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  async function fetchProductos() {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/productos`);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductos();
  }, []);

  function handleCreate() {
    setEditingProduct(null);
    setShowModal(true);
  }

  function handleEdit(producto: Producto) {
    setEditingProduct(producto);
    setShowModal(true);
  }

  function handleDeleteRequest(id: number) {
    setShowConfirm({ id });
  }

  async function confirmDelete(id: number) {
    try {
      const res = await fetch(`${backendUrl}/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setToast({ message: "Producto eliminado correctamente", type: "success" });
        await fetchProductos();
      } else {
        const error = await res.json();
        setToast({ message: `Error eliminando producto: ${error.error || error.mensaje}`, type: "error" });
      }
    } catch (error) {
      console.error("Error eliminando producto:", error);
      setToast({ message: "Error inesperado al eliminar producto.", type: "error" });
    } finally {
      setShowConfirm(null);
    }
  }

  async function handleSubmit(data: ProductFormValues) {
    try {
      let res;
      if (editingProduct) {
        // EDITAR
        res = await fetch(`${backendUrl}/api/productos/${editingProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...data,
            nombre_en_URL: data.nombre.toLowerCase().replace(/\s+/g, "-"),
          }),
        });
      } else {
        // CREAR
        res = await fetch(`${backendUrl}/api/productos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...data,
            nombre_en_URL: data.nombre.toLowerCase().replace(/\s+/g, "-"),
          }),
        });
      }

      if (res.ok) {
        setToast({
          message: editingProduct ? "Producto actualizado" : "Producto creado",
          type: "success",
        });
        await fetchProductos();
        setShowModal(false);
      } else {
        const error = await res.json();
        setToast({
          message: `Error guardando producto: ${error.error || error.mensaje}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error guardando producto:", error);
      setToast({
        message: "Error inesperado al guardar producto.",
        type: "error",
      });
    }
  }

  async function handleExportExcel() {
    try {
      if (!productos || productos.length === 0) {
        setToast({ message: "No hay productos para exportar", type: "error" });
        return;
      }

      const data = productos.map((p) => ({
        ID: p.id,
        Nombre: p.nombre,
        Descripción: p.descripcion,
        Categoría: p.categoria_id,
        Estado: p.estado,
        Stock: p.stock,
        Precio: `$${p.precio}`,
      }));

      exportProductsToExcel(data);
      setToast({ message: "Productos exportados correctamente", type: "success" });
    } catch (error) {
      console.error("Error exportando productos:", error);
      setToast({ message: "Error exportando productos", type: "error" });
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmi />

        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Productos</h1>
              <p className="text-sm text-gray-400">
                Listado de productos disponibles en Chibiquiles
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 text-sm"
              >
                <Plus className="w-4 h-4" /> Añadir producto
              </button>
              <button
                onClick={handleExportExcel}
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 text-sm"
              >
                Descargar Excel
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">Cargando productos...</p>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 text-left">ID</th>
                      <th className="px-6 py-3 text-left">Imagen</th>
                      <th className="px-6 py-3 text-left">Nombre</th>
                      <th className="px-6 py-3 text-left">Categoría</th>
                      <th className="px-6 py-3 text-left">Stock</th>
                      <th className="px-6 py-3 text-left">Precio</th>
                      <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productos.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {producto.id}
                        </td>
                        <td className="px-6 py-4">
                          {producto.imagen_path ? (
                            <img
                              src={producto.imagen_path}
                              alt={producto.nombre}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {producto.nombre}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {producto.categoria_id}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {producto.stock}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          ${producto.precio}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(producto)}
                              className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRequest(producto.id)}
                              className="inline-flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {productos.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-gray-500 text-center">
                          No hay productos registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <ProductForm
          initialData={editingProduct || undefined}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          message="¿Seguro de eliminar este producto?"
          onConfirm={() => confirmDelete(showConfirm.id)}
          onCancel={() => setShowConfirm(null)}
        />
      )}
    </div>
  );
}
