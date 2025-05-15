// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS desde tu dominio de Firebase
app.use(cors({
  origin: 'https://smartdish-firebase.web.app'  // ⚠️ Reemplaza con tu dominio exacto si cambia
}));

app.get('/captura', async (req, res) => {
  try {
    const response = await fetch('http://192.168.22.24/captura.jpg');  // IP de tu ESP32-CAM
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType);
    const buffer = await response.buffer();
    res.send(buffer);
  } catch (err) {
    res.status(500).send('Error al obtener la imagen');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});
