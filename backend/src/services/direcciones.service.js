const { poolConnect, pool, sql } = require("../config/db");

async function getDireccionesByClienteId(clienteId) {
  await poolConnect;

  const result = await pool.request()
    .input("cliente_id", sql.Int, clienteId)
    .query(`
      SELECT *
      FROM direcciones
      WHERE cliente_id = @cliente_id
      ORDER BY created_at DESC
    `);

  return result.recordset;
}

async function addDireccion(data) {
  await poolConnect;

  await pool.request()
    .input("cliente_id", sql.Int, data.cliente_id)
    .input("nombre_completo", sql.VarChar, data.nombre_completo)
    .input("telefono", sql.VarChar, data.telefono)
    .input("calle", sql.VarChar, data.calle)
    .input("ciudad", sql.VarChar, data.ciudad)
    .input("estado", sql.VarChar, data.estado)
    .input("codigo_postal", sql.VarChar, data.codigo_postal)
    .input("pais", sql.VarChar, data.pais)
    .input("principal", sql.Bit, data.principal ? 1 : 0)
    .query(`
      INSERT INTO direcciones
        (cliente_id, nombre_completo, telefono, calle, ciudad, estado, codigo_postal, pais, principal, created_at)
      VALUES
        (@cliente_id, @nombre_completo, @telefono, @calle, @ciudad, @estado, @codigo_postal, @pais, @principal, GETDATE())
    `);
}

module.exports = {
  getDireccionesByClienteId,
  addDireccion,
};
