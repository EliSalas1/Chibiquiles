const express = require("express");
const router = express.Router();
const controller = require("../controllers/direcciones.controller");

router.get("/:clienteId", controller.listDireccionesByCliente);
router.post("/", controller.createDireccion);

module.exports = router;
