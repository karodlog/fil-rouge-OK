
const express = require('express');
const taskRouter = express.Router();


taskRouter.route('/')
    .get((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.
    .post((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.
taskRouter.route('/:id')
    .get((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.
    .post((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.
    .delete((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.

taskRouter.route('/:categoryname')
    .get((req, res)=> {res.sendStatus(501);})
taskRouter.route('/:username')
    .get((req, res)=> {res.sendStatus(501);})

// on exporte notre routeur
module.exports = taskRouter