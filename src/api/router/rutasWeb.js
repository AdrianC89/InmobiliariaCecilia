const express = require('express');
const router = express.Router();
const path = require('path');
const Propiedad = require('../models/propiedades')


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

router.get('/propiedades', async (req, res) => {
  try {
    const propiedadesDB = await Propiedad.find()
    console.log(propiedadesDB)
    res.render('../pages/propiedades.ejs', {
      propiedades : propiedadesDB
    });
  } catch (error) {
    console.log(error)
  }


});


module.exports = router;
