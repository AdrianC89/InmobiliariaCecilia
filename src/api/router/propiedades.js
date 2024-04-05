const express = require('express');
const router = express.Router();
const path = require('path');
const { unlink } = require('fs-extra');
const Propiedad = require('../models/propiedades');
const { uploadImage } = require ('../cloudinary.js');

// Ruta para obtener todas las propiedades
router.get('/form', async (req, res) => {
  try {
    const propiedadesDB = await Propiedad.find();
    res.render('../pages/propiedades.ejs', {
      propiedades: propiedadesDB
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const propiedadesDB = await Propiedad.find();
    res.render('../pages/listas', {
      propiedades: propiedadesDB
    });
  } catch (error) {
    console.log(error);
  }
});

// Ruta para mostrar el formulario de creación de propiedades
router.get('/crear', (req, res) => {
  res.render('crear');
});

// Ruta para procesar la creación de una nueva propiedad
router.post('/', async (req, res) => {
  try {
    const propiedad = new Propiedad({
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      numeroRegistro: req.body.numeroRegistro,
      tipoOperacion: req.body.tipoOperacion,
      tipoPropiedad: req.body.tipoPropiedad,
      direccion: req.body.direccion,
      direccionBusq: req.body.direccionBusq,
      coordenada1: req.body.coordenada1,
      coordenada2: req.body.coordenada2,
      moneda: req.body.moneda,
      dormitorios: req.body.dormitorios,
      banos: req.body.banos,
      garage: req.body.garage,
      metro2prop: req.body.metro2prop,
      metro2terr: req.body.metro2terr,
      credito: req.body.credito,
      video: req.body.video
    });

    if (req.body && req.files && req.files.image) {
      const files = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
      for (const file of files) {
          const result = await uploadImage(file.tempFilePath);
          propiedad.imagenes.push({
              filename: result.original_filename,
              path: result.secure_url,
              originalname: result.original_filename,
              size: result.bytes
          });
      }
  }
    await propiedad.save();

    res.redirect('/propiedades');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear la propiedad');
  }
});


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