
const express = require('express');
const taskController = require('../controllers/task-controller');
const taskRouter = express.Router();


taskRouter.route('/')
    .get(taskController.getAll) //récup de toutes les cat.
    .post(taskController.create) //récup de toutes les cat.
taskRouter.route('/:id')
    .get(taskController.getById) //récup de toutes les cat.
    .put(taskController.update) //récup de toutes les cat.
    .delete(taskController.delete) //récup de toutes les cat.

taskRouter.route('/category/:categoryname')
    .get(taskController.getByCategory)
taskRouter.route('/user/:username')
    .get(taskController.getByUser)

// on exporte notre routeur
module.exports = taskRouter