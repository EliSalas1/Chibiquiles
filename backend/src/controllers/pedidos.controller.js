const service = require("../services/pedidos.service");
const { pool, poolConnect } = require("../config/db");

async function getAllPedidos(req, res) {
  try {
    await poolConnect;

    const result = await pool.request().query(`
  SELECT
    pedidos.id,
    ISNULL(usuarios.nombre, 'Desconocido') AS cliente_nombre,
    pedidos.created_at,
    pedidos.estado,
    pedidos.total
  FROM pedidos
  LEFT JOIN clientes ON pedidos.cliente_id = clientes.id
  LEFT JOIN usuarios ON clientes.usuario_id = usuarios.id
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

// ✅ NUEVO - CREAR PEDIDO
async function createPedido(req, res) {
  try {
    //lee más cosas
    const { clienteId, items, total, direccionId, estado } = req.body;

    await service.createPedido(clienteId, items, total, direccionId, estado);

    res.json({ mensaje: "Pedido creado con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear pedido" });
  }
}

module.exports = {
  getAllPedidos,
  createPedido
};
