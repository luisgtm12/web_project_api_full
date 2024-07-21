const express = require('express');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/user');
const { requestLogger, errorLogger } = require("./middlewares/logger.js");
const {jwtMiddleware} = require('./middlewares/auth.js')
const {celebrate,Joi} = require('celebrate');
require("dotenv").config();

const app = express();
const{PORT = 8001 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
var cors = require('cors');
const allowedOrigins = ['http://localhost:3000', 'http://api.web-around.mooo.com'];
// inclúyelos antes de otras rutas
const corsOptions = {
  origin: function (origin, callback) {
    // Permite solicitudes con origen undefined (p. ej., aplicaciones móviles)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El CORS policy para este sitio no permite acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow credentials if needed
};

app.use(cors(corsOptions));

app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(jwtMiddleware)


app.use('/users' ,users);
app.use('/cards' ,cards);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});



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