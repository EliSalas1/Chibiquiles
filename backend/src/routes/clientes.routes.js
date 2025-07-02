const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes.controller');

router.get('/', controller.getAllClientes);

module.exports = router;
