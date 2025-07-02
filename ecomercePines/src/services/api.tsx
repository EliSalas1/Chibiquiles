const API_URL = import.meta.env.VITE_BACKEND_URL;

// Obtener todos los productos
export async function getAllProducts() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

// Obtener producto por ID (con opiniones)
export async function getProductById(id: number) {
  const res = await fetch(`${API_URL}/productos/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return await res.json();
}

// Productos por categoría
export async function getAllProductsByCategory(categoryId: number) {
  const res = await fetch(`${API_URL}/categorias/${categoryId}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos por categoría");
  return await res.json();
}

// Productos destacados
export async function getFeaturedProducts() {
  const res = await fetch(`${API_URL}/productos-destacados`);
  if (!res.ok) throw new Error("Error al obtener destacados");
  return await res.json();
}

// Agregar opinión
export async function agregarOpinion(producto_id: number, calificacion: number, comentario: string, cliente_id: number) {
  const res = await fetch(`${API_URL}/opiniones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ producto_id, calificacion, comentario, cliente_id }),
  });
  if (!res.ok) throw new Error("Error al enviar opinión");
  return await res.json();
}

// Agregar al carrito
export async function addToCart(cliente_id: number, producto_id: number, cantidad: number) {
  const res = await fetch(`${API_URL}/carrito`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente_id, producto_id, cantidad }),
  });
  if (!res.ok) throw new Error("Error al agregar al carrito");
  return await res.json();
}

// Eliminar producto del carrito
export async function removeFromCart(cartitem_id: number) {
  const res = await fetch(`${API_URL}/carrito/item/${cartitem_id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar del carrito");
  return await res.json();
}

// Actualizar cantidad en carrito
export async function updateQuantityInCart(id: number, cantidad: number) {
  const res = await fetch(`${API_URL}/carrito/item/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });
  if (!res.ok) throw new Error("Error al actualizar cantidad");
  return await res.json();
}

// Vaciar carrito
export async function clearCart(cliente_id: number) {
  const res = await fetch(`${API_URL}/carrito/vaciar/${cliente_id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al vaciar carrito");
  return await res.json();
}
