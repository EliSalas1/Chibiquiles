import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getCarrito, getClienteByUsuarioId } from "../services/api.tsx";
import { FaEllipsisH, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 8;

export default function ProductosPines() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { user } = UserAuth();

  const goToDetails = (id: number) => {
    navigate(`/detalles/${id}`);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      if (!user) return alert("Debes iniciar sesión");

      const token = localStorage.getItem("token");
      if (!token) return alert("Token no encontrado.");

      const clienteData = await getClienteByUsuarioId(user.id, token);
      const clienteId = clienteData.clienteId;

      const carritoData = await getCarrito(clienteId, token);
      const carritoId = carritoData.carrito.id;

      await addToCart(carritoId, productId, 1, null, token);
      //alert("Producto añadido al carrito 🎉");
       toast.success("Producto añadido al carrito");
    } catch (err) {
      console.error(err);
      //alert("Hubo un error al agregar al carrito.");
      toast.error("Hubo un error al agregar al carrito.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        console.log("Todos los productos:", allProducts);

        const pines = allProducts.filter((p: any) =>
          p.nombre.toLowerCase().startsWith("pin")
        );

        setProducts(pines);
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
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 relative inline-block after:block after:h-1 after:w-20 after:bg-orange-400 after:mx-auto after:mt-2">
            Pines
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No hay pines disponibles.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <div key={product.id}>
                  <div
                    className="relative h-64 bg-cover bg-center rounded-md overflow-hidden group"
                    style={{ backgroundImage: `url(${product.imagen_path})` }}
                  >
                    <ul className="absolute bottom-[-60px] left-0 right-0 flex justify-center gap-3 transition-all duration-300 group-hover:bottom-5">
                      <li>
                        <button
                          onClick={() => goToDetails(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 rounded-full transition-all hover:bg-orange-400 hover:text-white"
                        >
                          <FaEllipsisH className="text-[16px]" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 rounded-full transition-all hover:bg-orange-400 hover:text-white"
                        >
                          <FaShoppingCart className="text-[16px]" />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center mt-4">
                    <h6 className="text-md font-semibold text-gray-800">
                      {product.nombre}
                    </h6>
                    <h5 className="text-orange-400 font-bold text-lg">
                      ${Number(product.precio).toFixed(2)}
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-10 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 disabled:opacity-50"
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
