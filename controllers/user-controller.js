

const UserDTO = require("../dto/user-dto");
const User = require("../models/user-model");

//! fonction de mappage d'un user de db pour éviter la redondance du code
const userMappertpDTO = (user) => new UserDTO(user.id, user.email, user.pseudo, user.firstname, user.lastname);


const userController = {
    getAll: async (req, res)=>{
        const users = await User.find();

        //on a récupéré les utilisateurs de la db mais aussi les pwd hashés !!!
        //on va transformer ça en userDTO

        //const usersAvecLastNamenenMaj = users.map(user => user.lastname.toUpperCase())

        //...user -> outil de décomposition d'un objet (fonctionne aussi sur les tableaux)
        const userDTO = users.map(userMappertpDTO);
        res.status(200).json(userDTO)
    },

    
    getByID: async (req, res)=>{
        //on récupère dans la requête l'id ds les paramètres
        const id = req.params.id;
        //on fait la requête pour récupérer l'util avec cet id
        const user = await User.findById(id);
        if(!user){
            return res.sendStatus(404) //not found
        }
        const userDTO = userMappertpDTO(user)
        res.status(200).json(userDTO)

    },


    update: async (req, res)=>{
        const id = req.params.id;

        const userUpdated = await User.findByIdAndUpdate(id, {
            pseudo: req.body.pseudo,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }, { returnDocument: 'after'}); 

        //on vérifie si notre id est existant
        if(!userUpdated){
            return res.sendStatus(404);
        }
        const userDTO = userMappertpDTO(userUpdated);
        res.status(200).json(userDTO);


    },
    delete: async (req, res)=>{
        //on a besoin de récup l'id de l'élément à supprimer
        const id = req.params.id;
        
        //on essaie de récupérer l'élément en db et de le supprimer
        //La fonction findByIdAndDelete renvoie l'utilisateur trouvé si id ok, sinon renvoie null
        const userTodelete = await User.findByIdAndDelete(id);
        if(!userTodelete){
            return res.sendStatus(404) // not found id
        }
        res.sendStatus(204); // OK id trouvé     
    },
}


module.exports = userController;