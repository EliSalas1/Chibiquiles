const { pool, poolConnect, sql } = require("../config/db");

async function getDashboardData() {
  await poolConnect;

  // Total de productos
  const productosResult = await pool.request().query(`
    SELECT COUNT(*) as total FROM productos
  `);
  const totalProductos = productosResult.recordset[0].total;

  // Total de clientes (usuarios con rol 2)
  const clientesResult = await pool.request().query(`
    SELECT COUNT(*) as total FROM usuarios WHERE roles_usuarios = 2
  `);
  const totalClientes = clientesResult.recordset[0].total;

  // Total ingresos (sumatoria de total en pedidos completados)
  const ingresosResult = await pool.request().query(`
    SELECT ISNULL(SUM(total), 0) as totalIngresos
    FROM pedidos
    WHERE estado = 'Completado'
  `);
  const totalIngresos = ingresosResult.recordset[0].totalIngresos;

  // Total de pedidos
  const pedidosResult = await pool.request().query(`
    SELECT COUNT(*) as totalPedidos
    FROM pedidos
  `);
  const totalPedidos = pedidosResult.recordset[0].totalPedidos;

// Últimos 5 pedidos
const pedidosRecientesResult = await pool.request().query(`
  SELECT TOP 5
    p.id,
    u.nombre AS cliente_nombre,
    p.estado,
    p.total
  FROM pedidos p
  JOIN clientes c ON p.cliente_id = c.id
  JOIN usuarios u ON c.usuario_id = u.id
  ORDER BY p.created_at DESC
`);


  // Productos populares 
const productosPopularesResult = await pool.request().query(`
  SELECT TOP 5
    p.nombre AS producto,
    c.nombre AS categoria,
    p.precio
  FROM productos p
  LEFT JOIN categorias c ON p.categoria_id = c.id
`);

  return {
    ingresosTotales: totalIngresos,
    totalPedidos,
    totalProductos,
    totalClientes,
    pedidosRecientes: pedidosRecientesResult.recordset,
    productosPopulares: productosPopularesResult.recordset
  };
}

module.exports = {
  getDashboardData
};
