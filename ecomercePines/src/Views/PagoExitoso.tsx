import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCart } from "../services/api";
import { UserAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function PagoExitoso() {
  const location = useLocation();
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { clearCart: clearCartContext } = useCart();

  const carritoId = location.state?.carritoId || null;

  useEffect(() => {
    const limpiarCarrito = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!user?.id) return;

        if (!carritoId) {
          console.warn("No se recibió carritoId en PagoExitoso.");
          return;
        }

        await clearCart(carritoId, token);
        console.log("✅ Carrito vaciado correctamente");

        clearCartContext();   // <-- ESTO LIMPIA EL FRONT

        navigate("/Carrito", { replace: true, state: { reload: true } });
      } catch (error) {
        console.error("❌ Error al vaciar el carrito:", error);
      }
    };

    limpiarCarrito();
  }, [carritoId, user]);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ ¡Gracias por tu compra!
      </h1>
      <p className="mt-4 text-gray-700">
        Tu carrito ha sido vaciado y tu pedido registrado correctamente.
      </p>
    </div>
  );
}
