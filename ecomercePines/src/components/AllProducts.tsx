import { useEffect, useState } from "react";
import {
  getAllProducts,
  getCarrito,
  createCarrito,
  addToCart,
} from "../services/api.tsx";
import { FaEllipsisH, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

type UserData = {
  id: number;
  correo: string;
  nombre?: string;
  rol?: number;
  [key: string]: any;
};

const ITEMS_PER_PAGE = 8;

export default function AllProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { user } = UserAuth();

  const goToDetails = (id: number) => {
    navigate(`/detalles/${id}`);
  };

const handleAddToCart = async (productoId: number) => {
  const token = localStorage.getItem("token");

  if (!user || !token) {
    toast("⚠️ Debes iniciar sesión para agregar productos al carrito.", {
  duration: 4000,
});

    return;
  }

  try {
    const decoded = jwtDecode<UserData>(token);

    const carritoData = await getCarrito(decoded.id, token);
    let carritoId;

    if (!carritoData.carrito) {
      const nuevoCarrito = await createCarrito(token);
      carritoId = nuevoCarrito.id;
    } else {
      carritoId = carritoData.carrito.id;
    }

    await addToCart(carritoId, productoId, 1, null, token);
    toast.success("Producto añadido al carrito");
  } catch (err) {
    console.error(err);
    toast.error("❌ Hubo un error inesperado al agregar al carrito.");
  }
};


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProducts();
        setProducts(result);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Nuestros productos
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando productos...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <article key={product.id}>
                  <div className="relative h-64 bg-cover bg-center rounded-md overflow-hidden group">
                    <img
                      src={product.imagen_path}
                      alt={`Imagen de ${product.nombre}`}
                      loading="lazy"
                      className="w-full h-[300px] object-cover rounded-md"
                    />
                    <ul className="absolute bottom-[-60px] left-0 right-0 flex justify-center gap-3 transition-all duration-300 group-hover:bottom-5">
                      <li>
                        <button
                          onClick={() => goToDetails(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 rounded-full hover:bg-orange-500 hover:text-white"
                        >
                          <FaEllipsisH />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 rounded-full hover:bg-orange-500 hover:text-white"
                        >
                          <FaShoppingCart />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-md font-semibold text-gray-800">
                      {product.nombre}
                    </p>
                    <p className="text-gray-800 font-bold text-lg">
                      ${product.precio.toFixed(2)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex justify-center items-center mt-10 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
