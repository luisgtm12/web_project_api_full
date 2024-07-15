const express = require('express');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/user');
const { requestLogger, errorLogger } = require("./middlewares/logger.js");

const app = express();
const{PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
var cors = require('cors');

// inclúyelos antes de otras rutas
app.use(cors());
app.options('*', cors());

app.use(requestLogger);
app.use(bodyParser.json());
app.use('/users' ,users);
app.use('/cards' ,cards);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(errorLogger);
// Middleware de manejo de errores de celebrate
app.use(errors());


// Ruta por defecto: devuelve un mensaje de error para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT,()=>{
  console.log(` Servidor en ejecución en http://localhost:${PORT}`);
});