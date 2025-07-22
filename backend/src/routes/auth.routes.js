// //auth.router.js
// const express = require('express');
// const router = express.Router();
// const { registrarUsuario, loginUsuario } = require('../controllers/auth.controller');

// router.post('/registro', registrarUsuario);
// router.post('/login', loginUsuario);

// module.exports = router;
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  authController.googleCallback
);

router.post('/registro', authController.registrarUsuario);
router.post('/login', authController.loginUsuario);

module.exports = router;
