const express = require('express');
const router = express.Router();
const path = require('path'); 


//Rutas
router.get('/', (req, res)=>{
    res.render('../pages/index.ejs')
  })
  
router.get('/:seccion',(req, res)=> {
    const seccion = req.params.seccion
    if(seccion == 'propiedades' || seccion == 'tasaciones' || seccion == 'nosotros' || seccion == 'contacto'){
      res.render(path.join('../pages/',`${seccion}.ejs`))
    }else{
      res.redirect('/')
    }
    
  })

module.exports = router;
  