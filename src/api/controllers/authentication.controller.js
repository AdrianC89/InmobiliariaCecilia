const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('../libs/jwt');
require('dotenv').config();

async function login(req, res) {
  const { password, username } = req.body;

  try {
    const userFound = await User.findOne({ username });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = await jwt.createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function register(req, res) {
  const { email, password, username } = req.body;

  try {
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ error: "Email already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
          username,
          email,
          password: passwordHash,
      });

      const userSaved = await newUser.save();
      const token = await jwt.createAccessToken({ id: userSaved._id });
      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({
          id: userSaved._id,
          username: userSaved.username,
          email: userSaved.email,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

async function logout(req, res) {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

async function profile(req, res) {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  login,
  register,
  logout,
  profile
};
