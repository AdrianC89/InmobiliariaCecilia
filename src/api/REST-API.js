const express = require('express')
const path = require('path')

//ZOTipHOiqCh0u053 contraseña de acceso db
const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '../pages')

app.use(express.static(path.join(__dirname, '../')));

//Rutas
app.get('/', (req, res)=>{
  res.render(path.join(__dirname, '../pages/','index.ejs'))
})

app.get('/:seccion',(req, res)=> {
  const seccion = req.params.seccion
  if(seccion == 'propiedades' || seccion == 'tasaciones' || seccion == 'nosotros' || seccion == 'contacto'){
    res.render(path.join(__dirname, '../pages/',`${seccion}.ejs`))
  }else{
    res.redirect('/')
  }
  
})



app.listen(port, ()=>{
    console.log("escuchando en el puerto:",port,"🚀");
})