const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

//ZOTipHOiqCh0u053 contraseña de acceso db
const app = express()
const port = process.env.PORT || 3000;

//Conexión a Base de Datos
const user = 'CeciliaGomez';
const password = 'HOD1XCWFuHsUCPax';
const dbname = 'Inmobiliaria'
const uri = `mongodb+srv://${user}:${password}@cluster0.npn3m5x.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

const mongoose = require('mongoose');

mongoose.connect(uri)
    .then(connection => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(error => {
        console.error('Error de conexión a la base de datos:', error);
    });



//Motor de Plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../pages'));

app.use(express.static(path.join(__dirname, '../')));


//Rutas importadas
app.use('/', require('./router/rutasWeb')); 

app.listen(port, () => {
    console.log("Escuchando en el puerto:", port, "🚀");
});