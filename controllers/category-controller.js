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
    update: async (req, res) => {
        //1) on récupère l'id passé en paramètre
        const id = req.params.id;
        //findByIdAndUpate(id, {}, {})
        //Premier param : id
        //Deuxième param : object avec les éléments à remplacer
        //Troisième : les options
        const category = await Category.findByIdAndUpdate(id, {
            name: req.body.name,
            icon: req.body.icon
        }, { returnDocument: 'after'}); 
        //Le comportement par défaut du findByIdAndUpdate renvoie l'élément avant qu'il ne soit modifier
        //Si on veut récupérer l'élément après modification, on devra rajouter l'option returnDocument : 'after'
        if(category){
            res.status(200).json(category);
        }
        else {
            res.sendStatus(404);
        }
    },
    delete: async (req, res) => {
        //1) on récupère l'id passé en paramètre
        const id = req.params.id;
        //La fonction findByIdAndDelete renvoie l'élément qui été delete si trouvé, sinon, renvoie null
        const categoryToDelete = await Category.findByIdAndDelete(id);
        //On doit vérifier si categoryToDelete n'est pas null
        if(categoryToDelete){
            res.sendStatus(204) //La requête a réussi mais l'appli client n'a pas besoin de quitter la page
            //res.sendStatus(200) //Fonctionne aussi, ce sera soit l'une soit l'autre
        }
        else {
            res.sendStatus(404); //-> Si categoryToDelete est null, c'est que l'id recherché n'existe pas : Not found
        }
    }



    //opérations CRUD
    //C -> Create
    //R -> Read
    //U -> Update
    //D -> Delete
}

// on exporte notre controller
module.exports = categoryController;