"use client";

import { useEffect, useState } from "react";
import { Pencil, PlusCircle } from "lucide-react";

export type ProductFormValues = {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  estado: string;
  imagen_path: string;
  stock: number;
  precio: number;
};

type Props = {
  initialData?: ProductFormValues;
  onClose: () => void;
  onSubmit: (data: ProductFormValues) => void;
};

const categorias = [
  { id: 1, nombre: "Anime" },
  { id: 2, nombre: "Animales" },
  { id: 3, nombre: "Cartoon" },
  { id: 4, nombre: "Personalizados" },
];

export default function ProductForm({
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ProductFormValues>({
    nombre: "",
    descripcion: "",
    categoria_id: 1,
    estado: "activo",
    imagen_path: "",
    stock: 0,
    precio: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "precio" ||
          name === "stock" ||
          name === "categoria_id"
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    // <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-gray-800/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          {initialData ? (
            <>
              <Pencil className="w-5 h-5 text-orange-600" />
              Editar
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 text-green-600" />
              Añadir
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800">
          <div>
            <label className="block mb-1 font-medium">Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Descripción del producto</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción del producto"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Categoría</label>
            <select
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            >
              <option value="activo">Activo</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">URL de imagen</label>
            <input
              type="text"
              name="imagen_path"
              placeholder="https://..."
              value={form.imagen_path}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              min={0}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Precio (MXN)</label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              min={0}
              step={0.01}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Guardar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
