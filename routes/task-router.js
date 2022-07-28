
const express = require('express');
const taskController = require('../controllers/task-controller');
const authentication = require('../middlewares/auth-jwt-middleware');
const bodyValidation = require('../middlewares/body-validation');
const idValidator = require('../middlewares/idValidator');
const {insertTaskValidator, updateTaskValidator} = require('../validators/task-validator');

const taskRouter = require("express").Router();



taskRouter.route('/')
    .get(authentication(), taskController.getAll) //!être connecté
    .post(authentication(), bodyValidation(insertTaskValidator), taskController.create)
taskRouter.route('/:id')
    .get(authentication(), idValidator(), taskController.getById)
    .put(authentication(), idValidator(), bodyValidation(updateTaskValidator), taskController.update)
    .delete(authentication('Admin'), idValidator(),taskController.delete) //! Etre connecté + admin

taskRouter.route('/category/:id')
    .get(authentication(), taskController.getByCategory)
taskRouter.route('/user/:id')
    .get(authentication(), taskController.getByUser)

// on exporte notre routeur
module.exports = taskRouter