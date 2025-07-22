const { poolConnect, pool, sql } = require("../config/db");

async function getOpinionesByProductoId(productoId) {
  await poolConnect;

  const result = await pool.request()
    .input("producto_id", sql.Int, productoId)
    .query(`
      SELECT *
      FROM opiniones
      WHERE producto_id = @producto_id
      ORDER BY created_at DESC
    `);

  return result.recordset;
}

async function addOpinion(data) {
  await poolConnect;

  await pool.request()
    .input("producto_id", sql.Int, data.producto_id)
    .input("calificacion", sql.Int, data.calificacion)
    .input("comentario", sql.NVarChar, data.comentario)
    .input("cliente_id", sql.Int, data.cliente_id)
    .query(`
      INSERT INTO opiniones (producto_id, calificacion, comentario, cliente_id, created_at)
      VALUES (@producto_id, @calificacion, @comentario, @cliente_id, GETDATE())
    `);
}

module.exports = {
  getOpinionesByProductoId,
  addOpinion,
};
