const mongoose = require('mongoose')
const idValidator = ()=>{
    return (req, res, next)=>{
        // on récupère l'id de la requete
        const id = req.params.id;
        //si l'id n'est pas un ObjectId valide...
        if (!mongoose.isValidObjectId(id)){
            //on renvoie une erreur 400
            res.sendStatus(400); // Bad request: la requete n'est pas bonne
            return;
        }
        // sinon on continue
        next();
    }


}

module.exports = idValidator;