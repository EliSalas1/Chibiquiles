// src/dtos/itemCarrito.dto.js

class ItemCarritoDTO {
  constructor(data) {
    this.id = data.id;
    this.cantidad = data.cantidad;
    this.producto = {
      id: data.producto_id,
      nombre: data.nombre,
      precio: data.precio,
      imagen_path: data.imagen_path,
    };
  }
}

module.exports = ItemCarritoDTO;
