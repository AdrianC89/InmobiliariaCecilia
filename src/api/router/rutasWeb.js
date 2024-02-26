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
  } catch (error) {
    console.log(error)
  }

  res.render('../pages/propiedades.ejs', {
    propiedades: [
      { id: 'aahh', nombre: 'Casa de Campo', descripcion: 'Casa con 3 habitaciones en La Pastora', precio: 3000 },
      { id: 'aahj', nombre: 'Casa de Ciudad', descripcion: 'Casa con 2 habitaciones en el Centro', precio: 5000 },
    ]
  });
});


module.exports = router;
