const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagenSchema = new Schema({
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    size: { type: Number }
});

const propiedadesSchema = new Schema({
    numeroRegistro: { type: String },
    tipoOperacion: { type: String, enum: ['Venta', 'Alquiler', 'Alquiler temporario', 'Venta en otra localidad', 'Remate', 'Permuta'] },
    tipoPropiedad: { type: String, enum: ['Casa', 'Departamento/Duplex', 'Quinta', 'Lote', 'Campo', 'Galpon', 'Local/Oficina', 'Cabañas/Hoteles/Otros', 'Fondo de comercio', 'Cocheras'] },
    direccion: { type: String },
    direccionBusq: { type: String },
    coordenada1: { type: String },
    coordenada2: { type: String },
    descripcion: { type: String },
    precio: { type: String },
    moneda: { type: String, enum: ['Peso', 'Dolar'] },
    dormitorios: { type: String, enum: ['Sin dormitorio', '1', '2', '3', '4', '5', '6', '7', '8'] },
    banos: { type: String, enum: ['Sin baño', '1', '2', '3', '4', '5'] },
    garage: { type: String, enum: ['No tiene garage', '1', '2', '3', '4', '5'] },
    metro2prop: { type: Number },
    metro2terr: { type: Number },
    credito: { type: String, enum: ['Apta para credito hipotecario', 'No apta para credito hipotecario'] },
    video: { type: String },
    imagenes: [imagenSchema] // Campo array para las imágenes
});
//creando el Modelo
const Propiedad = mongoose.model('propiedades', propiedadesSchema);

module.exports = Propiedad;