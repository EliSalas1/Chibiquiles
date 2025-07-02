//clientes.controller.js
const { poolConnect, pool, sql } = require("../config/db");

async function getAllClientes(req, res) {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT 
        u.id,
        u.nombre,
        u.correo,
        COUNT(p.id) as pedidos,
        ISNULL(SUM(p.total), 0) as totalGastado
      FROM usuarios u
      LEFT JOIN clientes c ON u.id = c.usuario_id
      LEFT JOIN pedidos p ON c.id = p.cliente_id
      WHERE u.roles_usuarios = 2 -- solo clientes jiji
      GROUP BY u.id, u.nombre, u.correo
      ORDER BY u.id
    `);

    const clientes = result.recordset.map(c => ({
      id: c.id,
      nombre: c.nombre,
      email: c.correo,
      estado: "Activo", // podría venir de la DB en el futuro
      pedidos: parseInt(c.pedidos),
      totalGastado: parseFloat(c.totalGastado).toFixed(2),
    }));

    res.json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error obteniendo clientes", detalle: err.message });
  }
}

module.exports = {
  getAllClientes,
};
