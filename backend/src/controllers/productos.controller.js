const ProductoDTO = require("../dtos/producto.dto");
const service = require("../services/productos.service");
const { uploadImageFromUrl } = require("../services/cloudinary.service");

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

    const nombreEnURL = nuevoProducto.nombre
      ? nuevoProducto.nombre.toLowerCase().replace(/\s+/g, "-")
      : "producto-sin-nombre";

    let imageUrl = nuevoProducto.imagen_path;

    if (imageUrl) {
      const uploadedUrl = await uploadImageFromUrl(imageUrl, nombreEnURL);
      imageUrl = uploadedUrl;
    }

    const productoGuardado = await service.createProducto({
      ...nuevoProducto,
      nombre_en_URL: nombreEnURL,
      imagen_path: imageUrl,
    });

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: productoGuardado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear producto",
      detalle: error.message,
    });
  }
}
//#region 
// async function create(req, res) {
//   try {
//     const nuevoProducto = req.body;
//     const id = await service.createProducto(nuevoProducto);
//     res.status(201).json({
//       mensaje: 'Producto creado exitosamente',
//       producto_id: id
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error al crear producto", detalle: error.message });
//   }
// }

// async function update(req, res) {
//   try {
//     const actualizado = await service.updateProducto(req.params.id, req.body);
//     if (!actualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });

//     res.json({ mensaje: "Producto actualizado correctamente" });
//   } catch (error) {
//     res.status(500).json({ error: "Error al actualizar producto", detalle: error.message });
//   }
// }

// async function update(req, res) {
//   try {
//     const dataToUpdate = req.body;

//     let imageUrl = dataToUpdate.imagen_path;

//     if (imageUrl) {
//       const uploadedUrl = await uploadImageFromUrl(imageUrl);
//       imageUrl = uploadedUrl;
//     }

//     const actualizado = await service.updateProducto(req.params.id, {
//       ...dataToUpdate,
//       imagen_path: imageUrl,
//     });

//     if (!actualizado) {
//       return res.status(404).json({ mensaje: "Producto no encontrado" });
//     }

//     res.json({ mensaje: "Producto actualizado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Error al actualizar producto",
//       detalle: error.message,
//     });
//   }
// }
//#endregion
async function update(req, res) {
  try {
    const productoExistente = await service.getProductoById(req.params.id);
    if (!productoExistente) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    let imagenUrl = productoExistente.imagen_path;

    if (
      req.body.imagen_path &&
      req.body.imagen_path !== productoExistente.imagen_path &&
      !req.body.imagen_path.includes("res.cloudinary.com")
    ) {
      imagenUrl = await uploadImageFromUrl(
        req.body.imagen_path,
        productoExistente.nombre_en_URL
      );
    }

    const nombreEnURL = req.body.nombre
      ? req.body.nombre.toLowerCase().replace(/\s+/g, "-")
      : productoExistente.nombre_en_URL;

    const productoData = {
      ...req.body,
      imagen_path: imagenUrl,
      nombre_en_URL: nombreEnURL,
    };

    const actualizado = await service.updateProducto(req.params.id, productoData);

    if (!actualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      error: "Error al actualizar producto",
      detalle: error.message,
    });
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
