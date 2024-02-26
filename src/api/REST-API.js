const express = require('express')
const path = require('path')

//ZOTipHOiqCh0u053 contraseña de acceso db
const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../pages'));

app.use(express.static(path.join(__dirname, '../')));


//Rutas importadas
app.use('/', require('./router/rutasWeb'));
app.use('/propiedades', require('./router/propiedades'));  

app.listen(port, () => {
    console.log("Escuchando en el puerto:", port, "🚀");
});