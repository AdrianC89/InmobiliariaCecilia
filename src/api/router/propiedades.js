const express = require('express');
const router = express.Router();
const path = require('path');
const { unlink } = require('fs-extra');
const Propiedad = require('../models/propiedades');
const { uploadImage, deleteImages } = require('../cloudinary.js');
const fs = require('fs');

// Ruta para obtener todas las propiedades


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

router.get('/tipo/:tipo', async (req, res) => {
  const tipo = req.params.tipo
  try {
    const propiedadesDB = await Propiedad.find({ tipoPropiedad: tipo });
    res.render('listas', {
      propiedades: propiedadesDB
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/detalle/:id', async (req, res) => {
  const id = req.params.id
  try {
    const propiedadDB = await Propiedad.findOne({ _id: id })
    res.render('detalleLista', {
      propiedad: propiedadDB,
      error: false
    })

  } catch (error) {
    console.log(error)
    res.render('detalleLista', {
      error: true,
      mensaje: 'No se encuentra el ID seleccionado'
    })
  }
})

//rutas del administrador

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

// Ruta para mostrar el formulario de creación de propiedades
router.get('/form/crear', (req, res) => {
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
              size: result.bytes,
              public_id: result.public_id
          });

          await fs.unlink(file.tempFilePath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
                // Manejar el error adecuadamente
            } else {
                console.log('Archivo eliminado correctamente');
            }
        });
      }
  }
    await propiedad.save();

    res.redirect('propiedades/form');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear la propiedad');
  }
});


router.get('/form/:id', async (req, res) => {

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

router.delete('/form/:id', async (req, res) => {
  const id = req.params.id

  try {
    // Encuentra y elimina la propiedad de la base de datos
    const propiedadDB = await Propiedad.findByIdAndDelete({ _id: id });

    // Verifica si la propiedad fue encontrada y eliminada correctamente
    if (propiedadDB) {
      // Extrae los public_ids de las imágenes asociadas a la propiedad
      const publicIds = propiedadDB.imagenes.map(imagen => imagen.public_id);
      
      // Elimina las imágenes asociadas a la propiedad en Cloudinary
      await deleteImages(publicIds);
      
      // Envía una respuesta exitosa
      res.json({
        estado: true,
        mensaje: 'Propiedad eliminada junto con sus imágenes.',
      });
    } else {
      // Envía una respuesta indicando que la propiedad no se encontró
      res.status(404).json({
        estado: false,
        mensaje: 'La propiedad no fue encontrada.',
      });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error al eliminar la propiedad:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al eliminar la propiedad.',
    });
  }
});


router.put('/form/:id', async(req, res) => {

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