require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuid } = require('uuid'); 

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


const port = process.env.PORT || 3000;

//Conexión a Base de Datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.npn3m5x.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

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

//Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../')));
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../imagenes/upload'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
    
})
app.use(multer({ storage: storage }).single('imagen'));

//Rutas importadas
app.use('/', require('./router/rutasWeb')); 
app.use('/propiedades', require('./router/propiedades')); 


app.listen(port, () => {
    console.log("Escuchando en el puerto:", port, "🚀");
});