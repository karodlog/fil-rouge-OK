
const express = require('express');
const userController = require('../controllers/user-controller');
const bodyValidation = require('../middlewares/body-validation');
const idValidator = require('../middlewares/idValidator');
const userValidator = require('../validators/user-validator');
const userRouter = express.Router();
const authentication = require('../middlewares/auth-jwt-middleware');



userRouter.route('/')
    .get(authentication(), userController.getAll) //récup de toutes les cat.

userRouter.route('/:id')
    .get(authentication(), idValidator(), userController.getByID)
    .put(authentication(['Admin']), idValidator(), bodyValidation(userValidator), userController.update)
    .delete(authentication(['Admin']), idValidator(), userController.delete)

// on exporte notre routeur
module.exports = userRouter