const jsonwebtoken = require('jsonwebtoken');
const usuarios = require('../controllers/authentication.controller.js');

require('dotenv').config();

function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    res.locals.logueado = logueado; // Pasar la información sobre si el usuario está logueado a la vista
    if (logueado) return next();
    return res.redirect("/");
}

function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
    res.locals.logueado = logueado; // Pasar la información sobre si el usuario está logueado a la vista
    if (!logueado) return next();
    return res.redirect("/admin");
}

function revisarCookie(req){
    try {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
        console.log(decodificada)
        const usuarioARevisar = usuarios.usuarios.find(usuario => usuario.user === decodificada.user);
        console.log(usuarioARevisar)
        if (!usuarioARevisar){
            return false
        }
        return true;
    }
    catch {
        return false
    }
}

function pasarInfoLogueo(req, res, next) {
    const logueado = revisarCookie(req);
    res.locals.logueado = logueado;
    next();
}

const methods = {
    soloAdmin,
    soloPublico,
    pasarInfoLogueo
  };
  
  module.exports = methods;