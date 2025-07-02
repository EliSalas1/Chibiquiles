import { useEffect, useState } from "react";
import { addToCart, getAllProducts } from "../services/api.tsx";
import { FaEllipsisH, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";

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

  const handleAddToCart = async (id: number) => {
    try {
      if (!user) return alert("Debes iniciar sesión");

      await addToCart(id, 1, user.id);
      alert("Producto añadido al carrito 🎉");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al agregar al carrito.");
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProducts();
        console.log("Productos obtenidos:", result);
        setProducts(result);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calcular productos visibles por página
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="py-10" aria-labelledby="productos-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2
            id="productos-heading"
            className="text-3xl font-bold text-gray-900 relative inline-block after:block after:h-1 after:w-20 after:bg-orange-500 after:mx-auto after:mt-2"
          >
            Nuestros productos
          </h2>

        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando productos...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <article key={product.id}
                  aria-label={`Producto ${product.nombre}`}
                >
                  <div
                    className="relative h-64 bg-cover bg-center rounded-md overflow-hidden group"
                  >
                    <img
                      src={product.imagen_path}
                      alt={`Imagen de ${product.nombre}`}
                      loading="lazy"
                      width={300}
                      height={300}
                      className="w-full h-[300px] object-cover rounded-md"
                    />
                    <ul className="absolute bottom-[-60px] left-0 right-0 flex justify-center gap-3 transition-all duration-300 group-hover:bottom-5">

                      <li>
                        <button

                          onClick={() => goToDetails(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 rounded-full transition-all hover:bg-orange-500 hover:text-white"
                          aria-label={`Ver detalles de ${product.nombre}`}
                        >
                          <FaEllipsisH className="text-[16px]" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          aria-label={`Agregar ${product.nombre} al carrito`}
                          className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-200 rounded-full transition-all hover:bg-orange-500 hover:text-white"
                        >
                          <FaShoppingCart className="text-[16px]" />
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

            {/* Pagination buttons */}
            <div className="flex justify-center items-center mt-10 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="cursor-pointer px-4 py-2  bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
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
