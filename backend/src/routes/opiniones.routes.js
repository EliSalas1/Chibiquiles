const express = require("express");
const router = express.Router();
const controller = require("../controllers/opiniones.controller");

router.get("/:productoId", controller.listOpiniones);
router.post("/", controller.createOpinion);

module.exports = router;
