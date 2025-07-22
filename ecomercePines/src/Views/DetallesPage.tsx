import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getProductById,
  getOpinionesByProductoId,
  getCarrito,
  createCarrito,
  addToCart,
} from "../services/api";
import Comentarios from "../components/Comentarios";
import { UserAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

type Opiniones = {
  id: number;
  cliente_id: string;
  producto_id: number;
  calificacion: number;
  comentario: string;
};

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_path: string;
  precio: number;
  stock: number;
  opiniones?: Opiniones[];
};

type UserData = {
  id: number;
  correo: string;
  nombre?: string;
  rol?: number;
  [key: string]: any;
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();

  // NUEVO: currency y exchange rates
  const [currency, setCurrency] = useState("MXN");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);

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

  const convertirPrecio = (precioEnMXN: number) => {
    if (!exchangeRates || currency === "MXN") {
      return precioEnMXN;
    }
    const rate = exchangeRates[currency];
    return precioEnMXN * rate;
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Debes iniciar sesión.");
      if (!product) return alert("Producto no disponible.");

      const decoded = jwtDecode<UserData>(token);

      const carritoData = await getCarrito(decoded.id, token);
      let carritoId;

      if (!carritoData.carrito) {
        const nuevoCarrito = await createCarrito(token);
        carritoId = nuevoCarrito.id;
      } else {
        carritoId = carritoData.carrito.id;
      }

      await addToCart(carritoId, product.id, 1, null, token);
      toast.success("Producto añadido al carrito");
      //alert("Producto añadido al carrito 🎉");
    } catch (err) {
      console.error(err);
      //alert("Hubo un error al agregar al carrito.");
      toast.error("Hubo un error al agregar al carrito.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));

        // 🔥 Cargamos opiniones del producto
        const opiniones = await getOpinionesByProductoId(Number(id));

        setProduct({
          ...data,
          opiniones,
        });
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando producto...</p>;
  if (!product) return <p className="text-center py-10 text-red-600">Producto no encontrado.</p>;

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Imagen principal */}
          <div className="flex flex-col items-center">
            <img
              src={product.imagen_path}
              alt={product.nombre}
              className="w-full max-w-md rounded-xl shadow-md"
            />
            <div className="flex gap-2 mt-4">
              <img
                src={product.imagen_path}
                className="w-16 h-16 object-cover rounded-md border"
                alt=""
              />
              <img
                src={product.imagen_path}
                className="w-16 h-16 object-cover rounded-md border"
                alt=""
              />
            </div>
          </div>

          {/* Detalles */}
          <div>
            <h3 className="text-2xl font-bold text-[#14213D] mb-2">
              {product.nombre}
            </h3>

            <div className="mb-4">
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

            <div className="text-2xl font-bold text-[#FCA311] mb-4">
              {currency} {convertirPrecio(product.precio).toFixed(2)}
            </div>

            <p className="text-[#0A0908] mb-4">{product.descripcion}</p>

            <button
              onClick={handleAddToCart}
              className="bg-[#FCA311] hover:bg-[#e6950e] text-white font-semibold px-6 py-3 rounded-md transition-all"
            >
              Añadir al carrito
            </button>

            <ul className="mt-6 space-y-2 text-sm text-[#0A0908]">
              <li>
                <b>Disponibilidad:</b>{" "}
                {product.stock > 0 ? "En stock" : "Agotado"}
              </li>
              <li>
                <b>Precio:</b> {currency} {convertirPrecio(product.precio).toFixed(2)}
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-[#0A0908] font-semibold">
                Compartir en:
              </span>
              <div className="flex gap-2 text-[#14213D]">
                <a href="#" className="hover:text-[#FCA311]">
                  Facebook
                </a>
                <a href="#" className="hover:text-[#FCA311]">
                  Twitter
                </a>
                <a href="#" className="hover:text-[#FCA311]">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-[#14213D]">
              Descripción
            </h4>
          </div>
          <p className="text-[#0A0908] leading-relaxed">
            {product.descripcion}
          </p>
        </div>

        {/* 🔥 Comentarios */}
        <Comentarios
  productoId={product.id}
  opiniones={product.opiniones ?? []}
  onOpinionAdded={async () => {
    const opinionesActualizadas = await getOpinionesByProductoId(Number(id));
    setProduct({
      ...product,
      opiniones: opinionesActualizadas,
    });
  }}

        />
      </section>
    </div>
  );
}
