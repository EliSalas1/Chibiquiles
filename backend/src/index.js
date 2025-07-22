const express = require('express');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');

const { poolConnect } = require('./config/db');

const productosRoutes = require('./routes/productos.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const clientesRoutes = require('./routes/clientes.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const carritoRoutes = require("./routes/carritos.routes");
const opinionesRoutes = require("./routes/opiniones.routes");
const direccionesRoutes = require("./routes/direcciones.routes");
const mercadoPagoRoutes = require('./routes/mercadoPago.routes');

require('./routes/authGoogle'); // Tu estrategia Google aquí

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: 'clave_secreta_segura',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', async (req, res) => {
  try {
    await poolConnect;
    res.json({ mensaje: 'Backend conectado exitosamente a SQL Server' });
  } catch (err) {
    res.status(500).json({ error: 'Error al conectar a la base de datos', detalle: err.message });
  }
});

// Importar rutas aquí
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use("/api/carritos", carritoRoutes);
app.use("/api/opiniones", opinionesRoutes);
app.use("/api/direcciones", direccionesRoutes);
app.use('/api/mercado-pago', mercadoPagoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
