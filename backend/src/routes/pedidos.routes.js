const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');
const authMiddleware = require("../middleware/authMiddleware");
const { onlyClientes } = require("../middleware/role.middleware");

router.get('/', pedidosController.getAllPedidos);
router.post('/', authMiddleware, onlyClientes, pedidosController.createPedido);

module.exports = router;
