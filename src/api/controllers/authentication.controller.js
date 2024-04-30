const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();


const usuarios = [{
    user: "adrian",
    email: "adrian@gmail.com",
    password: bcrypt.hashSync("a", 5)
}]

async function login(req,res){
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  if (!user || !password ){
    return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
  }
  const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
  if (!usuarioARevisar){
    return res.status(400).send({status:"Error",message:"Error durante el login"})
  }
  const loginCorrecto = await bcrypt.compare(password,usuarioARevisar.password);
  if (!loginCorrecto){
    return res.status(400).send({status:"Error",message:"Error durante el login"})
  }
  const token = jsonwebtoken.sign({user:usuarioARevisar.user},
    process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_EXPIRATION});
    const cookieOption = {
      expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      path: "/"
    };
    res.cookie("jwt",token,cookieOption);
    res.send({status:"ok",mesagge: "Usuario loggeado",redirect:"/admin"})
}


async function register(req,res){
  console.log(req.body);
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;
  if (!user || !password || !email){
    return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
  }
  const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
  if (usuarioARevisar){
    return res.status(400).send({status:"Error",message:"Este usuario ya existe"})

  }
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password,salt);
  const nuevoUsuario = {
    user, email, password: hashPassword
  }
  usuarios.push(nuevoUsuario);
  console.log(usuarios);
  return res.status(201).send({status:"ok", message:`Usuario ${nuevoUsuario.user} agregado`,redirect:"/"})
}


  
  module.exports = {
    usuarios,
    login,
    register
};