const Alert = require('../models/Alert');

// Crear alerta
exports.createAlert = async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todas las alertas
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener alerta por ID
exports.getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar alerta
exports.updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar alerta
exports.deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alerta eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
