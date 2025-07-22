const service = require("../services/direcciones.service");

async function listDireccionesByCliente(req, res) {
  try {
    const { clienteId } = req.params;

    const direcciones = await service.getDireccionesByClienteId(Number(clienteId));
    res.json(direcciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener direcciones." });
  }
}

async function createDireccion(req, res) {
  try {
    const direccion = req.body;

    await service.addDireccion(direccion);

    res.status(200).json({ mensaje: "Dirección registrada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la dirección." });
  }
}

module.exports = {
  listDireccionesByCliente,
  createDireccion,
};
