const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// SOLO admin puede gestionar usuarios
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso permitido solo para admin' });
  }
  next();
};

// ================================
// GET — Listar todos los usuarios
// ================================
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// ================================
// PUT — Actualizar rol de usuario
// ================================
router.put('/:id/role', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })
                           .select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
});

// ================================
// DELETE — Eliminar usuario
// ================================
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
