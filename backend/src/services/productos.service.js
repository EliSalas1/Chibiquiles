//productos.services.js
const { pool, poolConnect } = require("../config/db");

// async function getAllProductos() {
//   await poolConnect;
//   const result = await pool.request().query(`SELECT * FROM productos`);
//   return result.recordset;
// }

async function getAllProductos() {
  await poolConnect;
  const result = await pool
    .request()
    .query(`SELECT * FROM productos WHERE estado <> 'eliminado'`);
  return result.recordset;
}


async function getProductoById(id) {
  await poolConnect;
  const result = await pool
    .request()
    .input('id', id)
    .query(`SELECT * FROM productos WHERE id = @id`);
  return result.recordset[0];
}

async function createProducto(data) {
  await poolConnect;
  const {
    nombre,
    nombre_en_URL,
    descripcion,
    categoria_id,
    estado,
    imagen_path,
    stock,
    precio
  } = data;

  const result = await pool.request()
    .input('nombre', nombre)
    .input('nombre_en_URL', nombre_en_URL)
    .input('descripcion', descripcion)
    .input('categoria_id', categoria_id)
    .input('estado', estado)
    .input('imagen_path', imagen_path)
    .input('stock', stock)
    .input('precio', precio)
    .query(`
      INSERT INTO productos (nombre, nombre_en_URL, descripcion, categoria_id, estado, imagen_path, stock, precio)
      OUTPUT INSERTED.*
      VALUES (@nombre, @nombre_en_URL, @descripcion, @categoria_id, @estado, @imagen_path, @stock, @precio)
    `);

  return result.recordset[0];
}

async function updateProducto(id, data) {
  await poolConnect;
  const {
    nombre,
    nombre_en_URL,
    descripcion,
    categoria_id,
    estado,
    imagen_path,
    stock,
    precio
  } = data;

  const result = await pool.request()
    .input('id', id)
    .input('nombre', nombre)
    .input('nombre_en_URL', nombre_en_URL)
    .input('descripcion', descripcion)
    .input('categoria_id', categoria_id)
    .input('estado', estado)
    .input('imagen_path', imagen_path)
    .input('stock', stock)
    .input('precio', precio)
    .query(`
      UPDATE productos
      SET nombre = @nombre,
          nombre_en_URL = @nombre_en_URL,
          descripcion = @descripcion,
          categoria_id = @categoria_id,
          estado = @estado,
          imagen_path = @imagen_path,
          stock = @stock,
          precio = @precio
      WHERE id = @id
    `);

  return result.rowsAffected[0] > 0;
}

async function deleteProducto(id) {
  await poolConnect;
  const result = await pool.request()
    .input('id', id)
    .query(`
      UPDATE productos
      SET estado = 'eliminado'
      WHERE id = @id
    `);
  return result.rowsAffected[0] > 0;
    }
// async function deleteProducto(id) {
//   await poolConnect;
//   const result = await pool.request()
//     .input('id', id)
//     .query(`DELETE FROM productos WHERE id = @id`);
//   return result.rowsAffected[0] > 0;
// }

// async function deleteProducto(id) {
//   await poolConnect;
//   const result = await pool.request()
//     .input('id', id)
//     .query(`DELETE FROM productos WHERE id = @id`);
//   return result.rowsAffected[0] > 0;
// }

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
