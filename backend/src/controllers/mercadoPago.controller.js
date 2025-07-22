const mercadopago = require("mercadopago");

const createPayment = async (req, res) => {
  try {
    const { items } = req.body;

    const preference = {
      items,
back_urls: {
  success: "https://www.mercadopago.com.mx",
  failure: "https://www.mercadopago.com.mx",
  pending: "https://www.mercadopago.com.mx"
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    console.log("✅ Preferencia creada:", response.body.id);
    res.status(200).json({ payment_url: response.body.init_point });
  } catch (error) {
    console.error("❌ Error al crear el pago:", error);
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

module.exports = { createPayment };
