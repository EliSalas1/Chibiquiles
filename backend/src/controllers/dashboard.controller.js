
const dashboardService = require("../services/dashboard.service");

async function getDashboardSummary(req, res) {
  try {
    const data = await dashboardService.getDashboardData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo datos del dashboard", detalle: error.message });
  }
}

module.exports = {
  getDashboardSummary
};
