
// on importe le module express
const express = require('express');
const categoryRouter = express.Router();

//import du controller category
const categoryController = require('../controllers/category-controller');




// création des routes VERSION A
// categoryRouter.get('/', (req, res)=>{
//     console.log("Liste de toutes les catégories");
//     res.sendStatus(501) // Erreur -> fonctionnalité pas encore implémentée
// })
// categoryRouter.get('/:id', (req, res)=>{
//     console.log(`Récupération de la categorie dont l'ID est :${req.params.id}`);
//     res.sendStatus(501)
// })

// categoryRouter.post('/', (req, res)=>{
//     console.log(`Envoi d'une nouvelle catégorie`);
//     res.sendStatus(501)
// })

// categoryRouter.put('/:id', (req, res)=>{
//     console.log(`Modification de la catégorie dont l'ID est ${req.params.id}`);
//     res.sendStatus(501)
// })

// categoryRouter.delete('/:id', (req, res)=>{
//     console.log(`Suppression de la catégorie dont l'ID est ${req.params.id}`);
//     res.sendStatus(501)
// })

// VERSUS VERSION B

categoryRouter.route('/')
    .get(categoryController.getAll) //récup de toutes les cat.
    .post(categoryController.create)

categoryRouter.route('/:id')
    .get(categoryController.getById)
    .put(categoryController.update)
    .delete(categoryController.delete)

// on exporte notre routeur
module.exports = categoryRouter