const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));

module.exports = router;