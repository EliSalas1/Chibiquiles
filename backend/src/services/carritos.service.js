// src/services/carritos.service.js
//const { pool, poolConnect } = require("../config/db");
const { poolConnect, pool, sql } = require("../config/db");

// src/services/carritos.service.js
async function getCarritoByClienteId(clienteId) {
  try {
    await poolConnect;

    // ✅ Traer el carrito más reciente por cliente_id
    const carritoQuery = await pool.request()
      .input("clienteId", sql.Int, clienteId)
      .query(`
        SELECT TOP 1 *
        FROM carritos
        WHERE cliente_id = @clienteId
        ORDER BY created_at DESC
      `);

    const carrito = carritoQuery.recordset[0];
    if (!carrito) {
      // Si no existe carrito, devolvemos null (NO lanzamos error)
      return null;
    }

    // ✅ Traer ítems de ese carrito
    const itemsQuery = await pool.request()
      .input("carritoId", sql.Int, carrito.id)
      .query(`
        SELECT 
          ic.id,
          ic.cantidad,
          ic.producto_id,
          p.nombre,
          p.precio,
          p.imagen_path
        FROM items_carrito ic
        JOIN productos p ON p.id = ic.producto_id
        WHERE ic.carrito_id = @carritoId
      `);

    const items = itemsQuery.recordset;

    return {
      carrito,
      items,
    };

  } catch (error) {
    console.error("Error en getCarritoByClienteId:", error);
    throw error;
  }
}

async function createCarrito(clienteId) {
  await poolConnect;

  const result = await pool
    .request()
    .input("clienteId", clienteId)
    .query(`
      INSERT INTO carritos (cliente_id)
      OUTPUT INSERTED.*
      VALUES (@clienteId)
    `);

  return result.recordset[0];
}

async function addItemToCarrito(carritoId, productoId, cantidad, varianteId = null) {
  await poolConnect;

  const result = await pool
    .request()
    .input("carritoId", carritoId)
    .input("productoId", productoId)
    .input("varianteId", varianteId)
    .input("cantidad", cantidad)
    .query(`
      INSERT INTO items_carrito (carrito_id, producto_id, variante_id, cantidad)
      OUTPUT INSERTED.*
      VALUES (@carritoId, @productoId, @varianteId, @cantidad)
    `);

  return result.recordset[0];
}

async function updateItemQuantity(itemId, nuevaCantidad) {
  await poolConnect;

  const result = await pool
    .request()
    .input("itemId", itemId)
    .input("cantidad", nuevaCantidad)
    .query(`
      UPDATE items_carrito
      SET cantidad = @cantidad
      WHERE id = @itemId
    `);

  return result.rowsAffected[0] > 0;
}

async function deleteItem(itemId) {
  await poolConnect;

  const result = await pool
    .request()
    .input("itemId", itemId)
    .query(`
      DELETE FROM items_carrito
      WHERE id = @itemId
    `);

  return result.rowsAffected[0] > 0;
}

module.exports = {
  getCarritoByClienteId,
  createCarrito,
  addItemToCarrito,
  updateItemQuantity,
  deleteItem
};
