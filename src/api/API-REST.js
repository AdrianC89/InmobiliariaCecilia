import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.listen(port, ()=>{
    console.log("escuchando en el puerto:",port,"🚀");
})