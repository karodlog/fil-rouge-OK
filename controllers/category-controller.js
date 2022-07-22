const Category = require("../models/category-model");

const categoryController = {
    getAll: async (req, res)=>{
        // console.log('récupération de toutes les catégories');
        // res.sendStatus(501);
        const categories = await Category.find();
        res.status(200).json(categories);
    },
    getById :async (req, res)=> {
        // console.log(`Récupération de la catégorie dont l'id est [${req.params.id}]`);
        // res.sendStatus(501);
        const id = req.params.id;
        const category = await Category.findById(id);
        // console.log(category); // renvoir null si pas de catégorie
        // res.sendStatus(200);
        if(category){
            // si cat n'est pas null, on renvoie statut 200 et la cat obtenue
            res.status(200).json(category);
        }
        else{
            // si la cat est null, on renvoie une erreur 404 -> ressource not found
            res.sendStatus(404);
        }

    },
    create :async(req, res)=> {
        // console.log("Création de la nouvelle catégorie");
        // res.sendStatus(501);
        const categoryToAdd = Category(req.body);
        console.log(categoryToAdd);
        await categoryToAdd.save()
        res.status(200).json(categoryToAdd);

    },
    update :async (req, res)=> {
        console.log(`Modification de la catégorie dont l'id est [${req.params.id}]`);
        res.sendStatus(501);
    },
    delete :async (req, res)=> {
        console.log(`Suppression de la catégorie dont l'id est [${req.params.id}]`);
        res.sendStatus(501);
    }

    //opérations CRUD
    //C -> Create
    //R -> Read
    //U -> Update
    //D -> Delete
}

// on exporte notre controller
module.exports = categoryController;