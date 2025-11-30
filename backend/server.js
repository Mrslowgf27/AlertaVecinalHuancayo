require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado ✔"))
  .catch(err => console.error("Error de conexión MongoDB:", err));

// Rutas
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const alertRoutes = require('./routes/alertRoutes');
app.use('/api/alerts', alertRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend listo en puerto ${PORT} 🚀`);
});
