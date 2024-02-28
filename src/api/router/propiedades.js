const express = require('express');
const router = express.Router();
const path = require('path');
const Propiedad = require('../models/propiedades')

router.get('/', async (req, res) => {
  try {
    const propiedadesDB = await Propiedad.find()
    res.render('../pages/propiedades.ejs', {
      propiedades: propiedadesDB
    });
  } catch (error) {
    console.log(error)
  }


});

router.get('/crear', (req, res) => {
  res.render('crear')
})

router.post('/', async (req, res) => {
  const body = req.body
  try {

    await Propiedad.create(body)

    res.redirect('/propiedades')
  } catch (error) {
    console.log(error)
  }
})


router.get('/:id', async (req, res) => {

  const id = req.params.id
  try {
    const propiedadDB = await Propiedad.findOne({ _id: id })
    console.log(propiedadDB)

    res.render('detalle', {
      propiedad: propiedadDB,
      error: false
    })

  } catch (error) {
    console.log(error)
    res.render('detalle', {
      error: true,
      mensaje: 'No se encuentra el ID seleccionado'
    })
  }
})

module.exports = router;