const express = require('express');
const router = express.Router();
const path = require('path');
const authenticationController = require('../controllers/authentication.controller.js');
const authorization = require('../middlewares/authorization.js');
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

router.get('/login',authorization.soloPublico, (req, res) => {
  res.render('../pages/login.ejs')
})

router.get('/register',authorization.soloPublico, (req, res) => {
  res.render('../pages/register.ejs')
})

router.get('/admin',authorization.soloAdmin, (req, res) => {
  res.render('../pages/admin/admin.ejs')
})



router.post('/login',authenticationController.login)

router.post('/register',authenticationController.register)

module.exports = router;
