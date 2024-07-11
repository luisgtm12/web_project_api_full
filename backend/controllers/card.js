const Card = require('../models/card');
const ERROR_CODE = 400;

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500||error.statusCode || ERROR_CODE).json({ message: 'An error occurred while fetching cards' });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(error.statusCode || ERROR_CODE).json({ message: 'Invalid data provided for creating card' });
  }
};

exports.deleteCardById = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || ERROR_CODE).json({ message: 'An error occurred while deleting card' });
  }
};

exports.likeCard = (req, res) => {
  console.log(req.user._id);
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      console.log("ID de tarjeta no encontrado");
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message });
    });
};

exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true },
  )
    .catch((error) => {
      res.status(error.statusCode || ERROR_CODE).json({ message: error.message });;
    });
};