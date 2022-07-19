
const express = require('express');
const authRouter = express.Router();




authRouter.route('/login')
.post((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.
authRouter.route('/register')
.post((req, res)=> {res.sendStatus(501);}) //récup de toutes les cat.


// on exporte notre routeur
module.exports = authRouter