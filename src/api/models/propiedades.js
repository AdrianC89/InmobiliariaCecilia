const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creando el Esquema
const propiedadesSchema = new Schema({
    nombre: { type: String },
    descripcion: { type: String },
    precio: { type: String },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    size: { type: Number },
});

//creando el Modelo
const Propiedad = mongoose.model('propiedades', propiedadesSchema);

module.exports = Propiedad;