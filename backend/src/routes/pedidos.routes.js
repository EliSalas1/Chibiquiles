const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

//router.get('/pedidos', pedidosController.getAllPedidos);

router.get('/', pedidosController.getAllPedidos);

module.exports = router;
