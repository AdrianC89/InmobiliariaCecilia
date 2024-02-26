const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creando el Esquema
const propiedadesSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: String
})

//creando el Modelo
const Propiedad = mongoose.model('propiedades', propiedadesSchema);

module.exports = Propiedad;