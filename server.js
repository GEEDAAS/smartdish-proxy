// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS desde tu dominio de Firebase
app.get('/captura', async (req, res) => {
  const urlNgrok = 'https://cd13-2806-2f0-6000-a2ce-8425-bc28-45f1-618f.ngrok-free.app/captura.jpg';
  try {
    console.log(`Intentando acceder a: ${urlNgrok}`);

    const response = await fetch(urlNgrok, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    console.log(`Status de respuesta: ${response.status}`);

    if (!response.ok) {
      const text = await response.text();
      console.error("Contenido de error:", text);
      return res.status(500).send('Error al obtener la imagen desde ngrok');
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    const buffer = await response.buffer();
    res.send(buffer);
  } catch (err) {
    console.error("Error general al hacer fetch desde ngrok:", err);
    res.status(500).send('Error al obtener la imagen (excepción)');
  }
});



app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});
