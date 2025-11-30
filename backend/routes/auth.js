// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  if(!name||!email||!password) return res.status(400).json({error:'Faltan campos'});
  const exists = await User.findOne({ email });
  if(exists) return res.status(400).json({error:'Usuario ya existe'});
  const hash = await bcrypt.hash(password, 10);
  const u = new User({ name, email, passwordHash: hash });
  await u.save();
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: u._id, name: u.name, email: u.email, role: u.role } });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({error:'Credenciales inválidas'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({error:'Credenciales inválidas'});
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
