const express = require('express');
const router = express.Router();
const path = require('path');
const { unlink } = require('fs-extra');
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
  const propiedad = new Propiedad();
  propiedad.nombre = req.body.nombre;
  propiedad.descripcion = req.body.descripcion;
  propiedad.precio = req.body.precio;
  propiedad.filename = req.file.filename;
  propiedad.path = '/imagenes/upload/' + req.file.filename;
  propiedad.originalname = req.file.originalname;
  propiedad.size = req.file.size;

  await propiedad.save();

  res.redirect('/propiedades');
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

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const propiedadDB = await Propiedad.findByIdAndDelete({ _id:id });
    await unlink(path.resolve('./src/' + propiedadDB.path));
    if(propiedadDB){
      res.json({
        estado: true,
        mensaje: 'Eliminado!!',
      })
    } else {
      res.json({
        estado: false,
        mensaje: 'Falló eliminar!!',
      })
    }
  } catch (error) {
    console.log(error)
}
})

router.put('/:id', async(req, res) => {

  const id = req.params.id
  const body = req.body
  try {
    
    const propiedadDB = await Propiedad.findByIdAndUpdate(id, body, { useFindAndModify: false})
    console.log(propiedadDB)

    res.json({
      estado: true,
      mensaje: 'Editado'
    })
  } catch (error) {
    console.log(error)

    res.json({
      estado: false,
      mensaje: 'Fallamos!'
    })
  }
})

module.exports = router;