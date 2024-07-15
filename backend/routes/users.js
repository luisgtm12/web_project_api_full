const express = require("express");

const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../middlewares/validator");
const { jwtMiddleware } = require("../middlewares/auth");

const router = express.Router();
const userController = require("../controllers/user");
router.use(jwtMiddleware);

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);

router.get("/users/me", userController.getUserProfile);

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  userController.updateUserProfile
);

router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  userController.updateUserAvatarProfile
);

module.exports = router;