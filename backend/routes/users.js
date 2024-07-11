const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/me',userController.updateProfile)
router.patch('/me/avatar', userController.updateAvatar);

module.exports = router;