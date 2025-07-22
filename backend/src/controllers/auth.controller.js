// auth.controller.js
const { poolConnect, pool, sql } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

const loginUsuario = async (req, res) => {
  try {
    await poolConnect;

    const { correo, contraseña } = req.body;
    console.log('BODY:', req.body);

    const result = await pool.request()
      .input('correo', sql.VarChar, correo)
      .query('SELECT * FROM usuarios WHERE correo = @correo');

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.roles_usuarios },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
  token,
  rol: Number(usuario.roles_usuarios),
  nombre: usuario.nombre
});

    // res.json({
    //   mensaje: 'Login exitoso',
    //   token,
    //   rol: usuario.roles_usuarios,
    //   nombre: usuario.nombre
    // });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en login', detalle: error.message });
  }
};


// Registrar usuario

// auth.controller.js
const registrarUsuario = async (req, res) => {
  try {
    await poolConnect;

    const { correo, contraseña, nombre } = req.body;

    if (!correo || !contraseña || !nombre) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // insertar en usuarios
    const userResult = await pool.request()
      .input('correo', sql.VarChar, correo)
      .input('contraseña', sql.VarChar, hashedPassword)
      .input('nombre', sql.VarChar, nombre)
      .input('rol', sql.Int, 2)
      .query(`
        INSERT INTO usuarios (nombre, correo, contraseña, roles_usuarios)
        OUTPUT INSERTED.id
        VALUES (@nombre, @correo, @contraseña, @rol)
      `);

    const nuevoUserId = userResult.recordset[0].id;

    // insertar en clientes (¡clave!)
    await pool.request()
      .input('usuario_id', sql.Int, nuevoUserId)
      .input('telefono', sql.VarChar, null)
      .input('fecha_nacimiento', sql.Date, null)
      .input('genero', sql.VarChar, null)
      .query(`
        INSERT INTO clientes (usuario_id, telefono, fecha_nacimiento, genero)
        VALUES (@usuario_id, @telefono, @fecha_nacimiento, @genero)
      `);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', detalle: error.message });
  }
};

const googleCallback = async (req, res) => {
  try {
    console.log("✅ Entró a googleCallback");
    console.log("Datos Google:", req.user);

    const { email, name, photo } = req.user;

    await poolConnect;

    const result = await pool.request()
      .input('correo', sql.VarChar, email)
      .query(`
        SELECT * FROM usuarios WHERE correo = @correo
      `);

    let userId;

    if (result.recordset.length === 0) {
      const insertUser = await pool.request()
        .input('correo', sql.VarChar, email)
        .input('contraseña', sql.VarChar, '') 
        .input('nombre', sql.VarChar, name)
        .input('rol', sql.Int, 2)
        .query(`
          INSERT INTO usuarios (nombre, correo, contraseña, roles_usuarios)
          OUTPUT INSERTED.id
          VALUES (@nombre, @correo, @contraseña, @rol)
        `);

      userId = insertUser.recordset[0].id;

      await pool.request()
        .input('usuario_id', sql.Int, userId)
        .input('telefono', sql.VarChar, null)
        .input('fecha_nacimiento', sql.Date, null)
        .input('genero', sql.VarChar, null)
        .query(`
          INSERT INTO clientes (usuario_id, telefono, fecha_nacimiento, genero)
          VALUES (@usuario_id, @telefono, @fecha_nacimiento, @genero)
        `);
    } else {
      userId = result.recordset[0].id;
    }

    const token = jwt.sign(
      {
        id: userId,
        correo: email,
        rol: 2
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.redirect(
      `http://localhost:5173/auth/success` +
      `?token=${token}` +
      `&rol=2` +
      `&email=${encodeURIComponent(email)}` +
      `&name=${encodeURIComponent(name)}` +
      `&photo=${encodeURIComponent(photo || '')}`
    );

  } catch (error) {
    console.error('Error en googleCallback:', error);
    res.redirect('/login');
  }
};

module.exports = {
  loginUsuario,
  registrarUsuario,
  googleCallback
};


// const { poolConnect, pool, sql } = require('../config/db');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

// // login
// const loginUsuario = async (req, res) => {
//   try {
//     await poolConnect;

//     const { correo, contraseña } = req.body;
//     console.log('BODY:', req.body);

//     const result = await pool.request()
//       .input('correo', sql.VarChar, correo)
//       .query('SELECT * FROM usuarios WHERE correo = @correo');

//     const usuario = result.recordset[0];

//     if (!usuario) {
//       return res.status(404).json({ mensaje: 'Usuario no encontrado' });
//     }

//     const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
//     if (!passwordValida) {
//       return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
//     }

//     const token = jwt.sign(
//       { id: usuario.id, correo: usuario.correo, rol: usuario.roles_usuarios },
//       JWT_SECRET,
//       { expiresIn: '2h' }
//     );

//     res.json({ mensaje: 'Login exitoso', token });

//   } catch (error) {
//     console.error('Error al iniciar sesión:', error);
//     res.status(500).json({ mensaje: 'Error en login', detalle: error.message });
//   }
// };

// // Registrar usuario
// const registrarUsuario = async (req, res) => {
//   try {
//     await poolConnect;

//     const { correo, contraseña, nombre } = req.body;

//     if (!correo || !contraseña || !nombre) {
//       return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
//     }

//     const hashedPassword = await bcrypt.hash(contraseña, 10);

//     await pool.request()
//       .input('correo', sql.VarChar, correo)
//       .input('contraseña', sql.VarChar, hashedPassword)
//       .input('nombre', sql.VarChar, nombre)
//       .input('rol', sql.Int, 2) // 2 = cliente por ahorajijiji
//       .query(`
//         INSERT INTO usuarios (nombre, correo, contraseña, roles_usuarios)
//         VALUES (@nombre, @correo, @contraseña, @rol)
//       `);

//     res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

//   } catch (error) {
//     console.error('Error al registrar usuario:', error);
//     res.status(500).json({ mensaje: 'Error al registrar usuario', detalle: error.message });
//   }
// };

// module.exports = {
//   loginUsuario,
//   registrarUsuario
// };
