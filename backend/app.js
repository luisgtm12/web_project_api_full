const express = require('express');

const users = require('./routes/users');
const cards = require('./routes/cards');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const{PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/aroundb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use('/users' ,users);
app.use('/cards' ,cards);

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // ID del usuario de prueba
  };
  next();
});

// Ruta por defecto: devuelve un mensaje de error para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT,()=>{
  console.log(` Servidor en ejecución en http://localhost:${PORT}`);
});