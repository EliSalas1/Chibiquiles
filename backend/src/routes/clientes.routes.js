const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes.controller');

router.get('/', controller.getAllClientes);
//
router.get('/user/:usuarioId', controller.getClienteByUsuarioId);
module.exports = router;
