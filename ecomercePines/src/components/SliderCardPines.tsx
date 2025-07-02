import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { getFeaturedProducts } from "../services/api"; // Asegúrate de tener esta función
import { addToCart } from "../services/api";
import "swiper/swiper-bundle.css";
import { FaEllipsisH, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function SliderCardPines({ forceFullWidth = false }: { forceFullWidth?: boolean }) {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const goToDetails = (id: number) => {
    navigate(`/detalles/${id}`);
  };

    const handleAddToCart = async (id:number) => {
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
        const result = await getFeaturedProducts();
        const formatted = result
          .map((item: any) => item.productos)
          .filter((p: any) => p !== null);
        setProducts(formatted);
      } catch (err) {
        console.error("Error al obtener productos destacados:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full px-2 sm:px-4">
      <div className="mb-8">
        <Swiper
          className="w-full"
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2000 }}
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: forceFullWidth ? 4 : 3 },
            1280: { slidesPerView: forceFullWidth ? 2 : 4 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="w-64 flex flex-col items-center text-center group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                {/* Imagen */}
                <div className="relative w-full h-52 bg-gray-100 bg-cover bg-center rounded-md overflow-hidden group">
                  <img
                    src={product.imagen_path}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                  />

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

                <div className="p-4">
                  <span className="text-xs text-gray-500">Pines</span>
                  <h6 className="font-medium text-gray-800 hover:text-gray-800 transition">
                    <a href="#">{product.nombre}</a>
                  </h6>
                  <h5 className="text-gray-800 font-bold">
                    ${product.precio?.toFixed(2)}
                  </h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
