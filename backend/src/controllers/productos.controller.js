const ProductoDTO = require("../dtos/producto.dto");
const service = require("../services/productos.service");

async function getAll(req, res) {
  try {
    const productos = await service.getAllProductos();
    const productosDTO = productos.map(p => new ProductoDTO(p));
    res.json(productosDTO);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos", detalle: error.message });
  }
}

async function getById(req, res) {
  try {
    const producto = await service.getProductoById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    const productoDTO = new ProductoDTO(producto);
    res.json(productoDTO);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto", detalle: error.message });
  }
}

async function create(req, res) {
  try {
    const nuevoProducto = req.body;
    const id = await service.createProducto(nuevoProducto);
    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto_id: id
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto", detalle: error.message });
  }
}

async function update(req, res) {
  try {
    const actualizado = await service.updateProducto(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });

    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto", detalle: error.message });
  }
}

async function remove(req, res) {
  try {
    const eliminado = await service.deleteProducto(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto", detalle: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
