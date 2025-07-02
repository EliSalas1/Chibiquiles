"use client";

import { useEffect, useState } from "react";

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
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Editar Producto" : "Crear Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción del producto"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <select
            name="categoria_id"
            value={form.categoria_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white"
          >
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white"
          >
            <option value="activo">Activo</option>
            <option value="agotado">Agotado</option>
          </select>

          <input
            type="text"
            name="imagen_path"
            placeholder="URL de imagen (ej. https://...)"
            value={form.imagen_path}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="stock"
            placeholder="Cantidad disponible en stock"
            value={form.stock ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={0}
          />

          <input
            type="number"
            name="precio"
            placeholder="Precio del producto en MXN (ej. 99.99)"
            value={form.precio ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={0}
            step={0.01}
          />


          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
