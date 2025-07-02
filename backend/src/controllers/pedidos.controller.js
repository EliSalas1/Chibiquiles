//pedidos.controller.js
const { pool, poolConnect } = require("../config/db");

async function getAllPedidos(req, res) {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT
        pedidos.id,
        usuarios.nombre AS cliente_nombre,
        pedidos.created_at,
        pedidos.estado,
        pedidos.total
      FROM pedidos
      INNER JOIN clientes ON pedidos.cliente_id = clientes.id
      INNER JOIN usuarios ON clientes.usuario_id = usuarios.id
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener pedidos",
      detalle: error.message
    });
  }
}

module.exports = {
  getAllPedidos
};
