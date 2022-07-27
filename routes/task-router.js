
const express = require('express');
const taskController = require('../controllers/task-controller');
const bodyValidation = require('../middlewares/body-validation');
const idValidator = require('../middlewares/idValidator');
const {insertTaskValidator, updateTaskValidator} = require('../validators/task-validator');

const taskRouter = require("express").Router();



taskRouter.route('/')
    .get(taskController.getAll) //récup de toutes les cat.
    .post(bodyValidation(insertTaskValidator), taskController.create) //récup de toutes les cat.
taskRouter.route('/:id')
    .get(idValidator(), taskController.getById) //récup de toutes les cat.
    .put(idValidator(), bodyValidation(updateTaskValidator), taskController.update) //récup de toutes les cat.
    .delete(idValidator(),taskController.delete) //récup de toutes les cat.

taskRouter.route('/category/:categoryname')
    .get(taskController.getByCategory)
taskRouter.route('/user/:username')
    .get(taskController.getByUser)

// on exporte notre routeur
module.exports = taskRouter