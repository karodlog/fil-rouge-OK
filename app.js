require("dotenv-flow").config();

const {MESSAGE, NODE_ENV, PORT, DB_CONNECTION} = process.env

console.log(`Lancé en ${NODE_ENV} ${MESSAGE}`,);

// création d'un serveur express: A FAIRE EN PREMIER
const express = require('express');
const router = require('./routes')

require('express-async-errors');

// import du module mongoose
const mongoose = require('mongoose');

// on crée le serveur et on le met dans une variable
const app = express();

// route temporaire ppour vérifier qu'express fonctionne
// app.get('/users', (req, res)=>{
//     const data = {
//         msg: 'salut les types'
//     }
//     res.json(data);
// })





// on indique à notre app que pour chaque requête, elle doit l'intercepter
app.use(async(req, res, next)=>{
    //on attend que la connection soit établie
    await mongoose.connect(DB_CONNECTION);
    console.log('Connection réussie !');
    next();
})

// on indique à notre serveur qu'à l'arrivée sur le=a route api, il doit utiliser notre module routeur
app.use('/api', router);

// on met le serveur sur écoute
app.listen(PORT, ()=>{
    console.log((`Server up on port: ${PORT} [${NODE_ENV}]`));
})