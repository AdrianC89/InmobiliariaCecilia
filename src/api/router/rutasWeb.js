const express = require('express');
const router = express.Router();
const path = require('path');


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


module.exports = router;
