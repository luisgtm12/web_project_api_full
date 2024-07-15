const express = require("express");

const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../middlewares/validator");
const { jwtMiddleware } = require("../middlewares/auth");

const router = express.Router();
const {getAllUsers,getUserById,getUserProfile,updateProfile,updateAvatar} = require("../controllers/user");
router.use(jwtMiddleware);

router.get("/", getAllUsers);
router.get("/:userId", getUserById);

router.get("/me", getUserProfile);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

module.exports = router;