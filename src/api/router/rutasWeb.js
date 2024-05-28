const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationController = require('../controllers/authentication.controller.js');
const validateToken = require('../middlewares/validateToken.js');
const validate = require('../middlewares/validator.js');
const schema = require('../schema/auth.schema.js');


//Rutas
router.get('/', (req, res) => {
  res.render('../pages/index.ejs')
})


router.get('/tasaciones', (req, res) => {
  res.render('../pages/tasaciones.ejs')
})

router.get('/nosotros', (req, res) => {
  res.render('../pages/nosotros.ejs')
})

router.get('/contacto', (req, res) => {
  res.render('../pages/contacto.ejs')
})

router.get('/login', (req, res) => {
  res.render('../pages/login.ejs');
});

router.get('/register', (req, res) => {
  res.render('../pages/register.ejs');
});

router.get('/admin', (req, res) => {
  res.render('../pages/admin/admin.ejs');
});

// Rutas de autenticación
router.post('/login', validate.validateSchema(schema.loginSchema), authenticationController.login);
router.post('/register', validate.validateSchema(schema.registerSchema), authenticationController.register);
router.post('/logout', authenticationController.logout);
router.get('/profile', validateToken.authRequired, authenticationController.profile);

module.exports = router;
