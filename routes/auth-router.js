
const express = require('express');
const authController = require('../controllers/auth-controller');
const bodyValidation = require('../middlewares/body-validation');
const { registerValidator, loginValidator } = require('../validators/auth-validator');
const authRouter = express.Router();




authRouter.route('/login')
    .post(bodyValidation(loginValidator), authController.login) //récup de toutes les cat.
authRouter.route('/register')
    .post(bodyValidation(registerValidator), authController.register) //récup de toutes les cat.


// on exporte notre routeur
module.exports = authRouter