const User = require('../models/user');
const bcrypt = require("bcryptjs");
const {generateToken} = require("../middlewares/auth")
const { NotFoundError, InvalidError, ServerError } = require('../middlewares/errors');
const ERROR_CODE = 400;


module.exports.login = async(req,res,next)=>{
  const {email,password}= req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    console.log(user);
    if (user) {
      const token = await generateToken(user);
      return res.send({ token });
    }

    throw res.status(ERROR_CODE).send('Credenciales de inicio de sesión inválidas');
  } catch (error) {
    console.log(error);
    return res.status(404).send('Not found');
  }
};

module.exports.getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    res.json(users);
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
    res.json(user);
  } catch (error) {
    next(ServerError('Ha ocurrido un error en el servidor.'));
  }
};


module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw InvalidError('Ya Existe un usuario con ese email');
    }

    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(InvalidError('Se pasaron datos incorrectos.'));
    } else {
      next(ServerError('Ha ocurrido un error en el servidor.'));
    }
  }
};

module.exports.updateProfile = (req, res,next) => {
  console.log(req.user._id);
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún usuario con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch(next,(error) => {
      console.log(
        `Error ${error.name} con el mensaje ${error.message} ocurrió durante la ejecución del código, pero lo hemos manejado`
      );
    });
};

module.exports.updateAvatar = (req, res) => {
  console.log(req.user._id);
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ningún user con esa id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message });
    });
};
// Controlador para obtener información sobre el usuario actual
module.exports.getUserProfile = (req, res) => {
  const { user } = req;
  res.json({ user });
};