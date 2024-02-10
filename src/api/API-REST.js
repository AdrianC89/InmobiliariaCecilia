const express = require('express')
const fs = require('fs')


const app = express()
const port = 3000



app.get('/',(req, res)=> fs.readFile('../Data/datos.json',function(err, data){
  if(err){
    res.status(500).send("error en busqueda de propiedades")
    console.log(err)
    return
  }
  const datos = JSON.parse(data)
  res.json(datos)
}))

app.listen(port, ()=>{
    console.log("escuchando en el puerto:",port,"🚀");
})