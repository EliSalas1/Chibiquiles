const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { poolConnect } = require('./config/db');
const productosRoutes = require('./routes/productos.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const clientesRoutes = require('./routes/clientes.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const app = express();
app.use(express.json());
app.use(cors());

const session = require('express-session');
const passport = require('passport');
require('./routes/authGoogle'); // Este lo crearás ahora

app.use(
  session({
    secret: 'clave_secreta_segura',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Ruta base de prueba
app.get('/api', async (req, res) => {
  try {
    await poolConnect;
    res.json({ mensaje: 'Backend conectado exitosamente a SQL Server' });
  } catch (err) {
    res.status(500).json({ error: 'Error al conectar a la base de datos', detalle: err.message });
  }
});

// Ruta para redirigir a Google antes de las demás
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/Login',
    session: false
  }),
  (req, res) => {
    const user = req.user;
    // Redirige al frontend con los datos del usuario
    res.redirect(`http://localhost:5173/auth/success?email=${user.email}&name=${encodeURIComponent(user.name)}&photo=${encodeURIComponent(user.photo)}`);
  }
);

// importar rutas aquí
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/clientes', clientesRoutes);
//app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/pedidos', pedidosRoutes);


// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
