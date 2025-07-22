// src/controllers/carritos.controller.js
const { poolConnect, pool, sql } = require("../config/db");
const service = require("../services/carritos.service");
const ItemCarritoDTO = require("../dtos/itemCarrito.dto");

async function getCarritoByCliente(req, res) {
  try {
    const { clienteId } = req.params;

    const result = await service.getCarritoByClienteId(clienteId);

    if (!result) {
      return res.json({
        carrito: null,
        items: []
      });
    }

    const itemsDTO = result.items.map(item => new ItemCarritoDTO(item));

    res.json({
      carrito: result.carrito,
      items: itemsDTO
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito." });
  }
}


// src/controllers/carritos.controller.js

async function createCarrito(req, res) {
  await poolConnect;
  const usuarioId = req.user.id;

  // Buscar cliente_id en tabla clientes
  const clienteResult = await pool.request()
    .input("usuarioId", sql.Int, usuarioId)
    .query(`
      SELECT id
      FROM clientes
      WHERE usuario_id = @usuarioId
    `);

  const cliente = clienteResult.recordset[0];

  if (!cliente) {
    return res.status(404).json({ mensaje: "Cliente no encontrado para este usuario." });
  }

  // ✅ Buscamos si ya existe un carrito para este cliente
  const carritoExistente = await pool.request()
    .input("clienteId", sql.Int, cliente.id)
    .query(`
      SELECT TOP 1 *
      FROM carritos
      WHERE cliente_id = @clienteId
    `);

  if (carritoExistente.recordset.length > 0) {
    // Ya existe, NO crear otro
    return res.json(carritoExistente.recordset[0]);
  }

  // No existe → lo creamos
  const nuevoCarrito = await pool.request()
    .input("clienteId", sql.Int, cliente.id)
    .query(`
      INSERT INTO carritos (cliente_id)
      OUTPUT INSERTED.*
      VALUES (@clienteId)
    `);

  return res.json(nuevoCarrito.recordset[0]);
}


async function addItem(req, res) {
  try {
    console.log("req.user en addItem:", req.user);
    console.log("Body recibido:", req.body)
    const { carritoId } = req.params;
    const { productoId, cantidad, varianteId } = req.body;

    const item = await service.addItemToCarrito(
      carritoId,
      productoId,
      cantidad,
      varianteId
    );

    res.status(201).json(item);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el ítem al carrito." });
  }
}

async function updateItem(req, res) {
  try {
    const { itemId } = req.params;
    const { cantidad } = req.body;

    const ok = await service.updateItemQuantity(itemId, cantidad);

    if (!ok) {
      return res.status(404).json({ mensaje: "Ítem no encontrado" });
    }

    res.json({ mensaje: "Cantidad actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar cantidad" });
  }
}

async function deleteItem(req, res) {
  try {
    const { itemId } = req.params;

    const ok = await service.deleteItem(itemId);

    if (!ok) {
      return res.status(404).json({ mensaje: "Ítem no encontrado" });
    }

    res.json({ mensaje: "Ítem eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar ítem" });
  }
}

// src/controllers/carritos.controller.js
async function clearCarrito(req, res) {
  try {
    const { carritoId } = req.params;

    // ✅ BORRAR ITEMS de ese carrito
    await pool.request()
      .input("carritoId", sql.Int, carritoId)
      .query(`
        DELETE FROM items_carrito
        WHERE carrito_id = @carritoId
      `);

    // BORRAR el carrito mismo
    await pool.request()
  .input("carritoId", sql.Int, carritoId)
  .query(`
    DELETE FROM items_carrito
    WHERE carrito_id = @carritoId
  `);


    res.json({ mensaje: "Carrito vaciado y eliminado con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
}



// async function clearCarrito(req, res) {
//   try {
//     const { clienteId } = req.params;

//     // Borrar todos los items_carrito de ese cliente
//     await pool.request()
//       .input("clienteId", sql.Int, clienteId)
//       .query(`
//         DELETE ic
//         FROM items_carrito ic
//         INNER JOIN carritos c ON ic.carrito_id = c.id
//         WHERE c.cliente_id = @clienteId
//       `);

//     res.json({ mensaje: "Carrito vaciado con éxito" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al vaciar carrito" });
//   }
// }

module.exports = {
  getCarritoByCliente,
  createCarrito,
  addItem,
  updateItem,
  deleteItem,
  clearCarrito
};
