// CompraPage.tsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { createPayment } from "../services/api"; // 👈 Asegúrate de importar esto

import {
  getCarrito,
  getClienteByUsuarioId,
  createPedido,
  createDireccion,
} from "../services/api";
import { UserAuth } from "../context/AuthContext";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen_path: string;
}

interface ItemCarrito {
  id: number;
  cantidad: number;
  producto: Producto;
}

interface UserData {
  id: number;
  correo: string;
}

interface NominatimResult {
  display_name: string;
  address: any;
}

const CompraPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [direccionForm, setDireccionForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    calle: "",
    depto: "",
    ciudad: "",
    estado: "",
    codigo_postal: "",
    pais: "",
    correo: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const currentUser = jwtDecode<UserData>(token);
        const usuarioId = currentUser.id;

        const clienteResponse = await getClienteByUsuarioId(usuarioId, token);
        const clienteId = clienteResponse.clienteId;

        const carritoData = await getCarrito(clienteId, token);

        if (!carritoData?.items) {
          setItems([]);
          setSubtotal(0);
          return;
        }

        const mappedItems: ItemCarrito[] = carritoData.items.map((item: any) => ({
          id: parseInt(item.id),
          cantidad: parseInt(item.cantidad),
          producto: {
            id: parseInt(item.producto.id),
            nombre: item.producto.nombre,
            precio: parseFloat(item.producto.precio),
            imagen_path: item.producto.imagen_path,
          },
        }));

        setItems(mappedItems);

        const calculatedSubtotal = mappedItems.reduce(
          (sum: number, item: ItemCarrito) =>
            sum + item.producto.precio * item.cantidad,
          0
        );
        setSubtotal(calculatedSubtotal);
      } catch (error) {
        console.error("Error al obtener carrito en Checkout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const buscarDireccion = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&addressdetails=1&limit=5`,
        {
          headers: {
            "User-Agent": "MiTiendaEcommerce/1.0 (tucorreo@ejemplo.com)",
          },
        }
      );

      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error al consultar Nominatim:", error);
    }
  };

  const handleSelectAddress = (result: NominatimResult) => {
    const addr = result.address;

    const calle = addr.road || "";
    const numero = addr.house_number || "";
    const ciudad = addr.city || addr.town || addr.village || "";
    const estado = addr.state || "";
    const codigo_postal = addr.postcode || "";
    const pais = addr.country || "";

    setDireccionForm((prev) => ({
      ...prev,
      calle: `${calle} ${numero}`.trim(),
      ciudad,
      estado,
      codigo_postal,
      pais,
    }));

    setSearchResults([]);
    setSearchQuery(result.display_name);
  };

  const isFormComplete = () => {
    return (
      direccionForm.nombre.trim() !== "" &&
      direccionForm.apellido.trim() !== "" &&
      direccionForm.telefono.trim() !== "" &&
      direccionForm.calle.trim() !== "" &&
      direccionForm.ciudad.trim() !== "" &&
      direccionForm.estado.trim() !== "" &&
      direccionForm.codigo_postal.trim() !== "" &&
      direccionForm.pais.trim() !== "" &&
      direccionForm.correo.trim() !== ""
    );
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const currentUser = jwtDecode<UserData>(token);
    const usuarioId = currentUser.id;

    const clienteResponse = await getClienteByUsuarioId(usuarioId, token);
    const clienteId = clienteResponse.clienteId;

    // 1. Guardar dirección
    await createDireccion(
      {
        cliente_id: clienteId,
        nombre_completo: `${direccionForm.nombre} ${direccionForm.apellido}`,
        telefono: direccionForm.telefono,
        calle: `${direccionForm.calle}${
          direccionForm.depto ? ", " + direccionForm.depto : ""
        }`,
        ciudad: direccionForm.ciudad,
        estado: direccionForm.estado,
        codigo_postal: direccionForm.codigo_postal,
        pais: direccionForm.pais,
        principal: true,
      },
      token
    );

    // 2. Obtener carrito
    const carritoData = await getCarrito(clienteId, token);
    const carritoId = carritoData?.carrito?.id;

    if (!carritoId) {
      console.warn("No se encontró carrito para vaciar");
      return;
    }

    // 3. Registrar pedido en base de datos
    const itemsPayload = items.map((item) => ({
      productoId: item.producto.id,
      cantidad: item.cantidad,
      precio: item.producto.precio,
    }));

    await createPedido(clienteId, itemsPayload, subtotal, token);

    // 4. Preparar productos para Mercado Pago
    const products = items.map((item) => ({
      title: item.producto.nombre,
      quantity: item.cantidad,
      unit_price: item.producto.precio,
    }));

    // 5. Crear preferencia de pago y redirigir
    const { payment_url } = await createPayment(products);
    window.location.href = payment_url;

  } catch (error) {
    console.error("Error en el proceso de pago:", error);
    alert("Error al procesar el pedido y redirigir al pago.");
  }
};

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     const currentUser = jwtDecode<UserData>(token);
  //     const usuarioId = currentUser.id;

  //     const clienteResponse = await getClienteByUsuarioId(usuarioId, token);
  //     const clienteId = clienteResponse.clienteId;

  //     await createDireccion(
  //       {
  //         cliente_id: clienteId,
  //         nombre_completo: `${direccionForm.nombre} ${direccionForm.apellido}`,
  //         telefono: direccionForm.telefono,
  //         calle: `${direccionForm.calle}${
  //           direccionForm.depto ? ", " + direccionForm.depto : ""
  //         }`,
  //         ciudad: direccionForm.ciudad,
  //         estado: direccionForm.estado,
  //         codigo_postal: direccionForm.codigo_postal,
  //         pais: direccionForm.pais,
  //         principal: true,
  //       },
  //       token
  //     );

  //     const carritoData = await getCarrito(clienteId, token);
  //     const carritoId = carritoData?.carrito?.id;

  //     if (!carritoId) {
  //       console.warn("No se encontró carrito para vaciar");
  //       return;
  //     }

  //     const itemsPayload = items.map((item) => ({
  //       productoId: item.producto.id,
  //       cantidad: item.cantidad,
  //       precio: item.producto.precio,
  //     }));

  //     await createPedido(clienteId, itemsPayload, subtotal, token);

  //     navigate("/pago-exitoso", {
  //       state: { carritoId },
  //     });
  //   } catch (error) {
  //     console.error("Error al crear pedido:", error);
  //     alert("Error al realizar el pedido.");
  //   }
  // };

  if (loading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-0">
          <form
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            onSubmit={handleSubmit}
          >
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold text-[#14213D]">
                Detalles de Facturación
              </h3>

              {/* Nominatim Search Input */}
              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">
                  Buscar tu Estado:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                    placeholder="Buscando Estado..."
                  />
                  <button
                    type="button"
                    onClick={buscarDireccion}
                    className="bg-[#FCA311] text-white px-4 py-2 rounded-md hover:bg-[#e6950e] transition"
                  >
                    Buscar
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <ul className="mt-2 border border-gray-300 rounded-md max-h-48 overflow-y-auto bg-white">
                    {searchResults.map((r, i) => (
                      <li
                        key={i}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectAddress(r)}
                      >
                        {r.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={direccionForm.nombre}
                    onChange={(e) =>
                      setDireccionForm({ ...direccionForm, nombre: e.target.value })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    value={direccionForm.apellido}
                    onChange={(e) =>
                      setDireccionForm({ ...direccionForm, apellido: e.target.value })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">
                  País *
                </label>
                <input
                  type="text"
                  value={direccionForm.pais}
                  onChange={(e) =>
                    setDireccionForm({ ...direccionForm, pais: e.target.value })
                  }
                  className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#0A0908]">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={direccionForm.calle}
                  onChange={(e) =>
                    setDireccionForm({ ...direccionForm, calle: e.target.value })
                  }
                  placeholder="Calle, número"
                  className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5] mb-2"
                />
                <input
                  type="text"
                  placeholder="Departamento, suite (opcional)"
                  value={direccionForm.depto}
                  onChange={(e) =>
                    setDireccionForm({ ...direccionForm, depto: e.target.value })
                  }
                  className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    value={direccionForm.ciudad}
                    onChange={(e) =>
                      setDireccionForm({ ...direccionForm, ciudad: e.target.value })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={direccionForm.estado}
                    onChange={(e) =>
                      setDireccionForm({ ...direccionForm, estado: e.target.value })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    value={direccionForm.codigo_postal}
                    onChange={(e) =>
                      setDireccionForm({
                        ...direccionForm,
                        codigo_postal: e.target.value,
                      })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Teléfono *
                  </label>
                  <input
                    type="text"
                    value={direccionForm.telefono}
                    onChange={(e) =>
                      setDireccionForm({ ...direccionForm, telefono: e.target.value })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#0A0908]">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={direccionForm.correo}
                    onChange={(e) =>
                      setDireccionForm({ ...direccionForm, correo: e.target.value })
                    }
                    className="w-full bg-[#F6F6F6] p-3 rounded-md border border-[#E5E5E5]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#F6F6F6] p-6 rounded-xl shadow-md max-w-sm w-full self-start">
              <h4 className="text-xl font-bold text-[#14213D] mb-4">
                Tu Pedido
              </h4>

              <ul className="text-[#0A0908] space-y-2 text-sm mb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    {item.producto.nombre}{" "}
                    <span>
                      ${(item.producto.precio * item.cantidad).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between border-t border-[#E5E5E5] pt-2 font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={!isFormComplete()}
                className={`w-full mt-6 font-bold py-3 rounded-md transition ${
                  isFormComplete()
                    ? "bg-[#FCA311] text-white hover:bg-[#e6950e]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                REALIZAR PEDIDO
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CompraPage;
