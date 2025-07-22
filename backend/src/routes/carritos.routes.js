//src/routes/carritos.routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/carritos.controller");
const authMiddleware = require("../middleware/authMiddleware");
const { onlyClientes } = require("../middleware/role.middleware");

router.get("/:clienteId", authMiddleware, onlyClientes, controller.getCarritoByCliente);
router.post("/", authMiddleware, onlyClientes, controller.createCarrito);
router.post("/:carritoId/items", authMiddleware, onlyClientes, controller.addItem);
router.put("/items/:itemId", authMiddleware, onlyClientes, controller.updateItem);
router.delete("/items/:itemId", authMiddleware, onlyClientes, controller.deleteItem);
router.delete("/vaciar/:clienteId", authMiddleware, onlyClientes, controller.clearCarrito);
router.delete("/vaciar/:carritoId", authMiddleware, onlyClientes, controller.clearCarrito);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/carritos.controller");

// router.get("/:clienteId", controller.getCarritoByCliente);
// router.post("/", controller.createCarrito);
// router.post("/:carritoId/items", controller.addItem);
// router.put("/items/:itemId", controller.updateItem);
// router.delete("/items/:itemId", controller.deleteItem);


// module.exports = router;
