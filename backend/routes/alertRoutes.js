const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const verifyToken = require('../middleware/verifyToken');

// Crear alerta
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, latitude, longitude } = req.body;

    const alert = new Alert({
      title,
      description,
      latitude,
      longitude,
      userId: req.user.id
    });

    await alert.save();
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear alerta' });
  }
});

// Obtener todas las alertas
router.get('/', async (req, res) => {
  const alerts = await Alert.find().populate('userId', 'name email');
  res.json(alerts);
});

// Editar alerta
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const alerta = await Alert.findById(req.params.id);

    if (!alerta) return res.status(404).json({ error: "No existe la alerta" });

    if (alerta.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    Object.assign(alerta, req.body);

    await alerta.save();
    res.json(alerta);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar" });
  }
});

// Eliminar alerta
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const alerta = await Alert.findById(req.params.id);

    if (!alerta) return res.status(404).json({ error: "No existe" });

    if (alerta.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    await alerta.deleteOne();
    res.json({ msg: "Alerta eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

module.exports = router;
