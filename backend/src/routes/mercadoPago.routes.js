const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
require("dotenv").config();

console.log("Access token al iniciar archivo:", process.env.MP_ACCESS_TOKEN); // 👈 AGREGA ESTO

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
router.post('/create_payment', async (req, res) => {
  console.log("🔄 POST /create_payment");

  try {
    const { items } = req.body;

const preference = {
  items: items.map((item) => ({
    title: item.title || "Producto sin nombre",
    quantity: item.quantity || 1,
    unit_price: item.unit_price || 1,
    currency_id: "MXN",
  })),
back_urls: {
  success: "https://www.mercadopago.com.mx",
  failure: "https://www.mercadopago.com.mx",
  pending: "https://www.mercadopago.com.mx"
  },
  auto_return: "approved",
};


    // 👇 Este log debe ir DESPUÉS de definir `preference`
    console.log("🧾 Preferencia enviada a Mercado Pago:", JSON.stringify(preference, null, 2));

    const response = await mercadopago.preferences.create(preference);
    res.json({ payment_url: response.body.init_point });
  } catch (error) {
    console.error('❌ Error al crear el pago:', error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});


module.exports = router;

// back_urls: {
//   success: "http://localhost:5173/pago-exitoso",
//   failure: "http://localhost:5173/pago-error",
//   pending: "http://localhost:5173/pago-pendiente",
// }
