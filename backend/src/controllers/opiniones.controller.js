const service = require("../services/opiniones.service");

async function listOpiniones(req, res) {
  try {
    const { productoId } = req.params;

    const opiniones = await service.getOpinionesByProductoId(Number(productoId));
    res.json(opiniones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener opiniones." });
  }
}

async function createOpinion(req, res) {
  try {
    const opinion = req.body;

    await service.addOpinion(opinion);

    res.status(200).json({ mensaje: "Opinión registrada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la opinión." });
  }
}

module.exports = {
  listOpiniones,
  createOpinion,
};
