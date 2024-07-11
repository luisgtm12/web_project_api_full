const User = require('../models/user');
const ERROR_CODE = 400;

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(ERROR_CODE).json({ message: 'An error occurred while fetching users' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(ERROR_CODE).json({ message: 'An error occurred while fetching user' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(ERROR_CODE).json({ message: 'Invalid data provided for creating user' });
  }
};

module.exports.updateProfile = (req, res) => {
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
    .catch((error) => {
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