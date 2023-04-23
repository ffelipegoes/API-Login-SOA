const UserController = require('../controllers/userController');

const router = require('express').Router();

router.post('/cadastro', UserController.SignUp);

router.post('/login', UserController.Login);

module.exports = router;
