const API_URL = import.meta.env.VITE_BACKEND_URL;

// --------------------
// PRODUCTOS
// --------------------

export async function getAllProducts() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

export async function getProductById(id: number) {
  const res = await fetch(`${API_URL}/api/productos/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return await res.json();
}

export async function getAllProductsByCategory(categoryId: number) {
  const res = await fetch(`${API_URL}/api/categorias/${categoryId}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos por categoría");
  return await res.json();
}

export async function getFeaturedProducts() {
  const res = await fetch(`${API_URL}/api/productos-destacados`);
  if (!res.ok) throw new Error("Error al obtener destacados");
  return await res.json();
}

export async function agregarOpinion(
  producto_id: number,
  calificacion: number,
  comentario: string,
  cliente_id: number
) {
  const res = await fetch(`${API_URL}/api/opiniones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ producto_id, calificacion, comentario, cliente_id }),
  });
  if (!res.ok) throw new Error("Error al enviar opinión");
  return await res.json();
}

// --------------------
// CARRITO
// --------------------

export async function getCarrito(clienteId: number, token: string) {
  const response = await fetch(
    `${API_URL}/api/carritos/${clienteId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.log("Respuesta RAW del backend:", text);
    throw new Error("Error al consultar carrito");
  }

  return await response.json();
}



export async function createCarrito(token: string) {
  const res = await fetch(`${API_URL}/api/carritos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
  if (!res.ok) throw new Error("Error al crear carrito");
  return await res.json();
}

// export async function createCarrito(clienteId: number, token: string) {
//   const res = await fetch(`${API_URL}/api/carritos`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ clienteId }),
//   });
//   if (!res.ok) throw new Error("Error al crear carrito");
//   return await res.json();
// }

export async function addToCart(
  carritoId: number,
  productoId: number,
  cantidad: number,
  varianteId: number | null = null,
  token: string
) {
  const res = await fetch(`${API_URL}/api/carritos/${carritoId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productoId, cantidad, varianteId }),
  });
  if (!res.ok) throw new Error("Error al agregar al carrito");
  return await res.json();
}

export async function removeFromCart(itemId: number, token: string) {
  const res = await fetch(`${API_URL}/api/carritos/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar del carrito");
  return await res.json();
}

export async function updateQuantityInCart(
  itemId: number,
  cantidad: number,
  token: string
) {
  const res = await fetch(`${API_URL}/api/carritos/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cantidad }),
  });
  if (!res.ok) throw new Error("Error al actualizar cantidad");
  return await res.json();
}


// src/services/api.ts

export async function clearCart(carritoId: number, token: string) {
  const res = await fetch(
    `${API_URL}/api/carritos/vaciar/${carritoId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al vaciar carrito");
  }

  return await res.json();
}


export async function getClienteByUsuarioId(usuarioId: number, token: string) {
  const response = await fetch(
    `${API_URL}/api/clientes/user/${usuarioId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al consultar clienteId");
  }

  return await response.json();
}


export async function createPedido(
  clienteId: number,
  items: any[],
  total: number,
  token: string
) {
  const res = await fetch(`${API_URL}/api/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      clienteId,
      items,
      total,
    }),
  });

  if (!res.ok) {
    throw new Error("Error al crear pedido");
  }

  return await res.json();
}
//opiniones
// export async function agregarOpinion(
//   producto_id: number,
//   calificacion: number,
//   comentario: string,
//   cliente_id: number
// ) {
//   const res = await fetch(`${API_URL}/api/opiniones`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ producto_id, calificacion, comentario, cliente_id }),
//   });
//   if (!res.ok) throw new Error("Error al enviar opinión");
//   return await res.json();
// }

export async function getOpinionesByProductoId(productoId: number) {
  const res = await fetch(`${API_URL}/api/opiniones/${productoId}`);
  if (!res.ok) throw new Error("Error al obtener opiniones");
  return await res.json();
}

//direcciones
export async function getDireccionesByClienteId(clienteId: number, token: string) {
  const res = await fetch(`${API_URL}/api/direcciones/${clienteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener direcciones");
  return await res.json();
}


export async function createDireccion(
  direccion: {
    cliente_id: number;
    nombre_completo: string;
    telefono: string;
    calle: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
    principal: boolean;
  },
  token: string
) {
  const res = await fetch(`${API_URL}/api/direcciones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(direccion),
  });

  if (!res.ok) throw new Error("Error al crear dirección");
  return await res.json();
}

// MERCADO PAGO
export const createPayment = async (items: any[]) => {
  const res = await fetch("http://localhost:5000/api/mercado-pago/create_payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }), // ✅ aquí está la corrección
  });

  if (!res.ok) throw new Error("Error al crear la preferencia de pago");

  return res.json(); // esto debe devolverte { payment_url: ... }
};
