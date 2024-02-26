const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.render('../pages/propiedades.ejs', {
        propiedades: [
            {id: 'aahh', nombre: 'Casa de Campo', descripcion: 'Casa con 3 habitaciones en La Pastora', precio: 3000},
            {id: 'aahj', nombre: 'Casa de Ciudad', descripcion: 'Casa con 2 habitaciones en el Centro', precio: 5000},
        ]
    });
});

module.exports = router;
