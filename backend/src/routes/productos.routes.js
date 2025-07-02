//productos.routes.js
const express = require('express');
const router = express.Router();
const controller = require("../controllers/productos.controller");
const verificarToken = require('../middleware/authMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', verificarToken, controller.create);
router.put('/:id', verificarToken, controller.update);
router.delete('/:id', verificarToken, controller.remove);

module.exports = router;
