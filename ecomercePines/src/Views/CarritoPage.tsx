//CarritoPage.tsx:
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import {
  getCarrito,
  removeFromCart,
  updateQuantityInCart,
  getClienteByUsuarioId,
} from "../services/api";
import { useLocation } from "react-router-dom";

interface Producto {
  id: number;
  nombre: string;
  imagen_path: string;
  precio: number;
}

interface ItemCarrito {
  id: number;
  cantidad: number;
  producto: Producto;
}

interface UserData {
  id: number;
  correo: string;
  nombre?: string;
  rol?: number;
}

export default function CarritoPage() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [loading, setLoading] = useState(true);
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const location = useLocation();

  // NUEVO: estado para currency
  const [currency, setCurrency] = useState("MXN");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);

  // NUEVO: traer tasas de cambio
  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/e8b7adfe7e2140c2008bfc93/latest/MXN`
        );
        const data = await res.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error("Error al traer tasas de cambio", error);
      }
    }

    fetchExchangeRates();
  }, []);

  // NUEVO: función de conversión
  const convertirPrecio = (precioEnMXN: number) => {
    if (!exchangeRates || currency === "MXN") {
      return precioEnMXN;
    }
    const rate = exchangeRates[currency];
    return precioEnMXN * rate;
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const currentUser = jwtDecode<UserData>(token);
      const usuarioId = currentUser.id;

      const clienteResponse = await getClienteByUsuarioId(usuarioId, token);
      const clienteId = clienteResponse.clienteId;

      const carritoData = await getCarrito(clienteId, token);

      if (!carritoData?.carrito) {
        console.log("No hay carrito");
        setItems([]);
        return;
      }

      setCarritoId(carritoData.carrito.id);

      if (carritoData.items?.length > 0) {
        const mappedItems = carritoData.items.map((item: any) => ({
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
      } else {
        setItems([]);
      }
    } catch (e) {
      console.error("Error al obtener carrito", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [location.state?.reload]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );

  // NUEVO: subtotal convertido
  const subtotalConvertido = convertirPrecio(subtotal);

  const removeItem = async (itemId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await removeFromCart(itemId, token);
      fetchCart();
      alert("Producto eliminado del carrito.");
    } catch (error) {
      alert("Error al eliminar producto.");
      console.error(error);
    }
  };

  const updateQuantity = async (itemId: number, cambio: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const item = items.find((i) => i.id === itemId);
      if (!item) return;

      const nuevaCantidad = item.cantidad + cambio;
      if (nuevaCantidad < 1) return;

      await updateQuantityInCart(itemId, nuevaCantidad, token);
      fetchCart();
    } catch (error) {
      alert("Error al actualizar cantidad.");
      console.error(error);
    }
  };

  const irACheckout = () => {
    navigate("/Compra", {
      state: {
        carritoId,
      },
    });
  };

  if (loading) return <p className="text-center py-10">Cargando carrito...</p>;

  return (
    <>
      <section className="bg-gray-800 py-10 text-white text-center">
        <h1 className="text-4xl font-bold font-quicksand">🛍️ Tu Carrito</h1>
        <p className="text-md mt-2">
          Revisa tus artículos antes de completar tu compra
        </p>
      </section>

      <section className="py-16 bg-[#F6F6F6] min-h-screen">
        <div className="container mx-auto px-4">
          {/* NUEVO: selector de moneda */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#14213D]">
              Moneda:
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="MXN">MXN - Pesos</option>
              <option value="USD">USD - Dólares</option>
              <option value="EUR">EUR - Euros</option>
            </select>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-lg text-gray-600">
              Tu carrito está vacío.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto mb-10">
                <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-[#E5E5E5]">
                  <thead>
                    <tr className="bg-[#E5E5E5] text-[#14213D]">
                      <th className="py-3 px-4 text-left">Producto</th>
                      <th className="py-3 px-4">Precio</th>
                      <th className="py-3 px-4">Cantidad</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-800">
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#E5E5E5] transition"
                      >
                        <td className="flex items-center gap-4 py-4 px-4">
                          <img
                            src={item.producto.imagen_path}
                            alt="producto"
                            className="w-20 h-20 object-cover rounded-lg shadow"
                          />
                          <h5 className="font-semibold">
                            {item.producto.nombre}
                          </h5>
                        </td>
                        <td className="text-center">
                          {currency} {convertirPrecio(item.producto.precio).toFixed(2)}
                        </td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-[#FCA311] text-white font-bold px-3 rounded shadow cursor-pointer"
                            >
                              -
                            </button>
                            <div className="min-w-[2.5rem] px-2 py-1 text-center bg-white border border-[#E5E5E5] rounded font-semibold">
                              {item.cantidad}
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-[#FCA311] text-white font-bold px-3 rounded shadow cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-center font-medium">
                          {currency} {(convertirPrecio(item.producto.precio) * item.cantidad).toFixed(2)}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div></div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-lg font-bold text-[#14213D] mb-4">
                🧾 Total del carrito
              </h5>
              <ul className="mb-4 text-gray-700">
                <li className="flex justify-between border-b py-2">
                  <span>Subtotal</span>
                  <span>{currency} {subtotalConvertido.toFixed(2)}</span>
                </li>
                <li className="flex justify-between font-bold text-lg py-2">
                  <span>Total</span>
                  <span>{currency} {subtotalConvertido.toFixed(2)}</span>
                </li>
                <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
                  <button
                    onClick={irACheckout}
                    className="block w-full text-center bg-[#14213D] hover:bg-[#0A0908] text-white py-3 rounded font-semibold shadow"
                  >
                    Proceder a pago
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
