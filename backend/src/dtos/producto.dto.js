class ProductoDTO {
  constructor({ id, nombre, nombre_en_URL, descripcion, categoria_id, estado, imagen_path, stock, precio }) {
    this.id = id;
    this.nombre = nombre;
    this.nombre_en_URL = nombre_en_URL;
    this.descripcion = descripcion;
    this.categoria_id = categoria_id;
    this.estado = estado;
    this.imagen_path = imagen_path;
    this.stock = stock;
    this.precio = precio;
  }
}

module.exports = ProductoDTO;
