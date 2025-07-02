const { poolConnect, pool, sql } = require("../config/db");

async function getAnalytics(req, res) {
  try {
    await poolConnect;

    // 1. Ventas por mes (total de ventas y pedidos)
    const ventasQuery = await pool.request().query(`
      SELECT
        FORMAT(p.created_at, 'MMMM', 'es-ES') AS mes,
        SUM(p.total) AS total_ventas,
        COUNT(*) AS cantidad_pedidos
      FROM pedidos p
      GROUP BY FORMAT(p.created_at, 'MMMM', 'es-ES')
      ORDER BY MIN(MONTH(p.created_at))
    `);

    const ventasPorMes = ventasQuery.recordset.map(r => ({
      mes: r.mes,
      ventas: parseFloat(r.total_ventas || 0),
      pedidos: parseInt(r.cantidad_pedidos || 0)
    }));

    // 2. Nuevos clientes por mes
    const nuevosClientesQuery = await pool.request().query(`
      SELECT
        FORMAT(created_at, 'MMMM', 'es-ES') AS mes,
        COUNT(*) AS nuevos_clientes
      FROM clientes
      GROUP BY FORMAT(created_at, 'MMMM', 'es-ES')
      ORDER BY MIN(MONTH(created_at))
    `);

    const mesesClientes = nuevosClientesQuery.recordset.map(r => ({
      mes: r.mes,
      nuevos: parseInt(r.nuevos_clientes || 0)
    }));

    // Para front, lo pasamos a array numérico en orden de ventasPorMes
    const nuevosClientes = ventasPorMes.map(v => {
      const match = mesesClientes.find(m => m.mes === v.mes);
      return match ? match.nuevos : 0;
    });

    // 3. Clientes recurrentes (clientes con más de un pedido)
    const recurrentesQuery = await pool.request().query(`
      SELECT
        c.id AS cliente_id,
        COUNT(p.id) AS cantidad_pedidos
      FROM clientes c
      LEFT JOIN pedidos p ON p.cliente_id = c.id
      GROUP BY c.id
      HAVING COUNT(p.id) > 1
    `);

    const clientesRecurrentesCount = recurrentesQuery.recordset.length;

    // Distribución por mes (simplificada, mismo valor en todos los meses)
    const clientesRecurrentes = ventasPorMes.map(() => clientesRecurrentesCount);

    // 4. Ingresos totales
    const totalQuery = await pool.request().query(`
      SELECT SUM(total) AS total
      FROM pedidos
    `);

    const ingresosTotales = totalQuery.recordset[0].total || 0;

    // 5. Total de pedidos procesados
    const pedidosQuery = await pool.request().query(`
      SELECT COUNT(*) AS total
      FROM pedidos
    `);

    const pedidosProcesados = pedidosQuery.recordset[0].total || 0;

    // 6. Tasa de retención (simplificada)
    const clientesTotalesQuery = await pool.request().query(`
      SELECT COUNT(*) AS total FROM clientes
    `);
    const totalClientes = clientesTotalesQuery.recordset[0].total || 0;

    const tasaRetencion = totalClientes > 0
      ? ((clientesRecurrentesCount / totalClientes) * 100).toFixed(2)
      : 0;

    res.json({
      ventasPorMes,
      nuevosClientes,
      clientesRecurrentes,
      ingresosTotales,
      pedidosProcesados,
      tasaRetencion
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error obteniendo datos de analytics",
      detalle: error.message
    });
  }
}

module.exports = {
  getAnalytics
};
