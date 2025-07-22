//pedidos.services.js
const { pool, sql, poolConnect } = require("../config/db");

async function createPedido(clienteId, items, total, direccionId = null, estado = "pendiente") {
  await poolConnect;

  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const pedidoResult = await transaction.request()
      .input("clienteId", sql.Int, clienteId)
      .input("direccionId", sql.Int, direccionId)
      .input("estado", sql.VarChar(50), estado)
      .input("total", sql.Decimal(18,2), total)
      .query(`
        INSERT INTO pedidos (cliente_id, direccion_id, estado, total, created_at)
        OUTPUT INSERTED.id
        VALUES (@clienteId, @direccionId, @estado, @total, GETDATE())
      `);

    const pedidoId = pedidoResult.recordset[0].id;

    for (const item of items) {
      await transaction.request()
        .input("pedidoId", sql.Int, pedidoId)
        .input("productoId", sql.Int, item.productoId)
        .input("cantidad", sql.Int, item.cantidad)
        .input("precio", sql.Decimal(18,2), item.precio)
        .query(`
          INSERT INTO items_pedido (pedido_id, producto_id, cantidad, precio_unitario)
          VALUES (@pedidoId, @productoId, @cantidad, @precio)
        `);

      await transaction.request()
        .input("productoId", sql.Int, item.productoId)
        .input("cantidad", sql.Int, item.cantidad)
        .query(`
          UPDATE productos
          SET stock = stock - @cantidad
          WHERE id = @productoId
        `);
    }

    await transaction.commit();

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}


module.exports = {
  createPedido,
};
