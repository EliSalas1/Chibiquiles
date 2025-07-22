//middleware/role.middleware.js
function onlyClientes(req, res, next) {
  if (!req.user || Number(req.user.rol) !== 2) {
    return res.status(403).json({ mensaje: "Acceso solo permitido para clientes." });
  }
  next();
}

module.exports = { onlyClientes };
