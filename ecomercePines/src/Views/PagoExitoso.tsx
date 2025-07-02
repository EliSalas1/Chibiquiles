import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { clearCart } from "../services/api";

export default function PagoExitoso() {
  const { user } = UserAuth();

  useEffect(() => {
    const limpiarCarrito = async () => {
      if (!user?.id) return;
      try {
        await clearCart(user.id);
        console.log("✅ Carrito vaciado");
      } catch (error) {
        console.error("❌ Error al vaciar el carrito:", error);
      }
    };

    limpiarCarrito();
  }, [user]);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">✅ ¡Gracias por tu compra!</h1>
      <p className="mt-4 text-gray-700">Tu carrito ha sido vaciado y tu pedido registrado correctamente.</p>
    </div>
  );
}
