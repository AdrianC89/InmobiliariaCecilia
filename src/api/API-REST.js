import express from 'express'
import path, {dirname, join} from 'path'

const app = express()
const port = 3000

app.get('/',(req, res)=> res.json({"id":1, "propiedad":"departamento", "habitaciones":2, "baños":1}))

app.listen(port, ()=>{
    console.log("escuchando en el puerto:",port,"🚀");
})