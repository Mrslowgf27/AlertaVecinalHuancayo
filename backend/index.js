require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());

// 🔥 HABILITAR CORS CORRECTAMENTE
app.use(cors({
  origin: "https://mrslowgf27.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado ✔"))
  .catch(err => console.error("Error de conexión MongoDB:", err));

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/alerts', require('./routes/alertRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend listo en puerto ${PORT} 🚀`));
