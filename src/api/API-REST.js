const express = require('express')
const path = require('path')


const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../')));

//Rutas
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '../pages/','index.html'))
})

app.get('/:seccion',(req, res)=> {
  const seccion = req.params.seccion
  if(seccion == 'propiedades' || seccion == 'tasaciones' || seccion == 'nosotros' || seccion == 'contacto'){
    res.sendFile(path.join(__dirname, '../pages/',`${seccion}.html`))
  }else{
    res.redirect('/')
  }
  
})



app.listen(port, ()=>{
    console.log("escuchando en el puerto:",port,"🚀");
})