// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { client } from "../supabase/client";
// import { UserAuth } from "../context/AuthContext";
// import { removeFromCart, updateQuantityInCart } from "../services/api";
// import { createPayment } from "../services/mercadoPago";
// // TODO: Migrar a backend SQL.
// interface Producto {
//   id: number;
//   nombre: string;
//   imagen_path: string;
//   precio: number;
// }

// interface ItemCarrito {
//   id: number;
//   cantidad: number;
//   producto: Producto;
// }

// export default function CartSection() {
//   const { user } = UserAuth();
//   const [items, setItems] = useState<ItemCarrito[]>([]);
//   const [loading, setLoading] = useState(true);
//   const fetchedOnce = useRef(false);

//   useEffect(() => {
//     if (!user || fetchedOnce.current) return;
//     fetchedOnce.current = true;
//     fetchCart();
//   }, [user]);

//   const handleCheckout = async () => {
//     const itemsToSend = items.map((item) => ({
//       title: item.producto.nombre,
//       unit_price: item.producto.precio,
//       quantity: item.cantidad,
//     }));

//     try {
//       const paymentUrl = await createPayment(itemsToSend);
//       window.location.href = paymentUrl; // redirecciona a Mercado Pago
//     } catch (error) {
//       alert("No se pudo generar el pago. Intenta más tarde.");
//     }
//   };

//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const { data: carrito, error: errorCarrito } = await client
//         .from("carritos")
//         .select("id")
//         .eq("cliente_id", user.id)
//         .maybeSingle();

//       if (errorCarrito) throw errorCarrito;
//       if (!carrito) return;
//       const { data: itemsCarrito, error: errorItems } = await client
//         .from("items_carrito")
//         .select("id, cantidad, producto:producto_id ( id, nombre, precio, imagen_path )")
//         .eq("carrito_id", carrito.id);

//       if (errorItems) throw errorItems;

//       setItems(
//         itemsCarrito.map((item: any) => ({
//           id: item.id,
//           cantidad: item.cantidad,
//           producto: Array.isArray(item.producto) ? item.producto[0] : item.producto,
//         }))
//       );

//     } catch (err) {
//       console.error("Error al cargar el carrito:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.producto.precio * item.cantidad,
//     0
//   );

//   if (loading) return <p className="text-center py-10">Cargando carrito...</p>;

//   const removeItem = async (id_carrito: number, id_producto: number) => {
//     const { error } = await removeFromCart(id_carrito, id_producto);

//     if (error) {
//       alert("Ocurrió un error al eliminar el producto del carrito");
//       console.error(error);
//       return;
//     }
//     fetchCart();
//     alert("El producto se ha eliminado del carrito");
//   };


//   const updateQuantity = async (itemId: number, cambio: number) => {
//     const item = items.find((i) => i.id === itemId);
//     if (!item) return;

//     const nuevaCantidad = item.cantidad + cambio;

//     if (nuevaCantidad < 1) return; // Evitar cantidades menores a 1

//     const error = await updateQuantityInCart(itemId, nuevaCantidad);

//     if (error) {
//       alert("Error al actualizar la cantidad");
//       console.error(error);
//       return;
//     }

//     // Actualizar estado local (más rápido que recargar todo)
//     setItems((prev) =>
//       prev.map((i) =>
//         i.id === itemId ? { ...i, cantidad: nuevaCantidad } : i
//       )
//     );
//   };

//   return (
//     <>
//       {/* Banner encabezado */}
//       <section className="bg-gray-800 py-10 text-white text-center">
//         <h1 className="text-4xl font-bold font-quicksand">🛍️ Tu Carrito</h1>
//         <p className="text-md mt-2">Revisa tus artículos antes de completar tu compra</p>
//       </section>

//       <section className="py-16 bg-[#F6F6F6] min-h-screen">
//         <div className="container mx-auto px-4">
//           {items.length === 0 ? (
//             <p className="text-center text-lg text-gray-600">Tu carrito está vacío.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto mb-10">
//                 <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-[#E5E5E5]">
//                   <thead>
//                     <tr className="bg-[#E5E5E5] text-[#14213D]">
//                       <th className="py-3 px-4 text-left">Producto</th>
//                       <th className="py-3 px-4">Precio</th>
//                       <th className="py-3 px-4">Cantidad</th>
//                       <th className="py-3 px-4">Total</th>
//                       <th className="py-3 px-4"></th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-sm text-gray-800">
//                     {items.map((item) => (
//                       <tr key={item.id} className="hover:bg-[#E5E5E5] transition">
//                         <td className="flex items-center gap-4 py-4 px-4">
//                           <img src={item.producto.imagen_path} alt="producto" className="w-20 h-20 object-cover rounded-lg shadow" />
//                           <h5 className="font-semibold">{item.producto.nombre}</h5>
//                         </td>
//                         <td className="text-center">${item.producto.precio.toFixed(2)}</td>
//                         <td className="text-center">
//                           <div className="flex items-center justify-center gap-2">
//                             <button
//                               type="button"
//                               onClick={() => updateQuantity(item.id, -1)}
//                               className="bg-[#FCA311] text-white font-bold px-3 rounded shadow cursor-pointer"
//                             >
//                               -
//                             </button>
//                             <div className="min-w-[2.5rem] px-2 py-1 text-center bg-white border border-[#E5E5E5] rounded font-semibold">
//                               {item.cantidad}
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => updateQuantity(item.id, 1)}
//                               className="bg-[#FCA311] text-white font-bold px-3 rounded shadow cursor-pointer"
//                             >
//                               +
//                             </button>
//                           </div>
//                         </td>
//                         <td className="text-center font-medium">${(item.producto.precio * item.cantidad).toFixed(2)}</td>
//                         <td className="text-center">
//                           <button
//                             type="button"
//                             onClick={() => removeItem(item.id, item.producto.id)}
//                             className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
//                           >
//                             🗑️
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>)}
//           {/* Botones */}
//           <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
//             <Link
//               to="/"
//               className="bg-[#14213D] hover:bg-[#0A0908] text-white font-medium py-2 px-4 rounded shadow"
//             >
//               ⬅️ Regresar al menú principal
//             </Link>
//             <button className="bg-[#FCA311] hover:bg-yellow-500 text-white font-medium py-2 px-6 rounded shadow">
//               🔄 Actualizar Carrito
//             </button>
//           </div>

//           {/* Cupon y Total */}
//           <div className="grid grid-cols-1 lg:grid-cols-2">
//             <div></div>
//             {/* Total */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h5 className="text-lg font-bold text-[#14213D] mb-4">🧾 Total del carrito</h5>
//               <ul className="mb-4 text-gray-700">
//                 <li className="flex justify-between border-b py-2">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </li>
//                 <li className="flex justify-between font-bold text-lg py-2">
//                   <span>Total</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </li>
//               </ul>
//               <button
//                 onClick={handleCheckout}
//                 className="block w-full text-center bg-[#14213D] hover:bg-[#0A0908] text-white py-3 rounded font-semibold shadow"
//               >
//                 Proceder a pago
//               </button>

//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
