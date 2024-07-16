const express = require('express');
const fs = require('fs');
const path = require('path');
const { celebrate, Joi } = require('celebrate');
const { jwtMiddleware } = require('../middlewares/auth');

const router = express.Router();
const cardController = require('../controllers/card');
router.use(jwtMiddleware)

router.get('/', cardController.getAllCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), cardController.createCard);

router.delete('/:cardId', cardController.deleteCardById);
router.put('/:cardId/likes', cardController.likeCard);
router.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = router;