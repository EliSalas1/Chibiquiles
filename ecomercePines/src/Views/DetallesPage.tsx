import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../services/api"; // Ajusta la ruta si es distinta
import Comentarios from "../components/Comentarios";
import { addToCart } from "../services/api";
import { UserAuth } from "../context/AuthContext"; // si usas tu propio context

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

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth(); // o como accedas al usuario

  const handleAddToCart = async () => {
    try {
      if (!user) return alert("Debes iniciar sesión");
      if (!product) return alert("Producto no disponible");
  
      await addToCart(product.id, 1, user.id);
      alert("Producto añadido al carrito 🎉");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al agregar al carrito.");
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        console.log(data);
        setProduct(data);
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
              />
              <img
                src={product.imagen_path}
                className="w-16 h-16 object-cover rounded-md border"
              />
            </div>
          </div>

          {/* Detalles */}
          <div>
            <h3 className="text-2xl font-bold text-[#14213D] mb-2">
              {product.nombre}
            </h3>
            <div className="text-2xl font-bold text-[#FCA311] mb-4">
              ${product.precio.toFixed(2)}
            </div>
            <p className="text-[#0A0908] mb-4">{product.descripcion}</p>

            {/* <div className="flex items-center gap-4 mb-6">
              <label className="text-[#0A0908]">Cantidad:</label>
              <input
                type="number"
                defaultValue={1}
                min={1}
                max={product.stock}
                className="w-16 text-center border border-[#E5E5E5] rounded-md p-2 bg-white"
              />
            </div> */}

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
                <b>Precio:</b> ${product.precio.toFixed(2)}
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

        {/* Descripción */}
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

        {/* Reseñas */}
        <Comentarios
          productoId={product.id}
          opiniones={product.opiniones ?? []}
          onOpinionAdded={async () => {
            const updated = await getProductById(Number(id));
            setProduct(updated);
          }}
        />


      </section>
    </div>
  );
};