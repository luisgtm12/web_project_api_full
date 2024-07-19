const User = require('../models/user');
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {generateToken} = require("../middlewares/auth")
const { NotFoundError, InvalidError, ServerError } = require('../middlewares/errors');
const ERROR_CODE = 400;
const { JWT_SECRET } = process.env;




module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('Request Body login:', req.body);
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('Request Token antes:', user);
      const token = generateToken(user);
      console.log('Request Token:', user,{token});
      res.send({ token });
    })
    .catch((err) => {
     // console.log(err)
      res.status(401).send({ message: 'Correo o contraseña incorrectos' });
    });
};

module.exports.getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    res.json({ data:users });
  } catch (error) {
    next(ServerError('Ha ocurrido un error en el servidor.'));
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const error = NotFoundError('Usuario no encontrado');
    if (!user) {
      return  error;
    }
    res.json({ data: user });
  } catch (error) {
    next(ServerError('Ha ocurrido un error en el servidor.'));
  }
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;
  console.log('Datos recibidos en createUser:', req.body);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error(" El email ya se encuentra registrado");
      } else {
        return bcrypt.hash(req.body.password, 10);
      }
    })

    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash });
    })

    .then((user) => {
      res.send({ data: user });
    })

    .catch((error) => {
      res.status(ERROR_CODE).json({ message: error.message });
    });
};
module.exports.updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(NotFoundError('No se ha encontrado ningún usuario con esa id'));
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};
module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(NotFoundError('No se ha encontrado ningún user con esa id'));
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};
// Controlador para obtener información sobre el usuario actual
module.exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(NotFoundError('Usuario no encontrado'));
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};