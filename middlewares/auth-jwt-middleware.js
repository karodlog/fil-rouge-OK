const User = require('../models/user-model');
const jwtUtils = require('../utils/jwt-utils');

// roles sera un tableau qui contient tous les rôles qui ont accès à la route
const authentication = (roles) =>{
    return async (req, res, next) =>{
        const authHeader = req.headers['authorization'];
        //on récupère dans le header, la valeur pour la propriété authorization
        const token = authHeader ? authHeader.split(' ')[1] : false;

        //pas de token
        if(!token){
            return res.sendStatus(401) // Unauthorized -> pas autorisé
        }

        // si token, on va le décoder
        let decodedToken;
        try{
            decodedToken = await jwtUtils.decode(token);
            //si le décodage fonctionne, decodedToken ressemble à ceci
            //decodedToken = {
                // id: '2545465c455',
                // psuedo: 'ouioui'
                //role: 'user'
                // }
            }
        
        catch(error){
            return res.sendStatus(403) //Forbidden

        }
        //si on réussi à le décoder, on valide les éventuelles option passées en paramètre

        if(roles){
            //on va vérifier en bdd si l'utilisateur à un des rôles présents dans notre tableau
            // on vérifie tjs en db et pas dans le decodedToken au cas ù le rôle a été changé
            const userDB =  User.findById(decodedToken.id);
            const userDBRole = userDB.role;

            if(!roles.includes(userDBRole)){
                return res.sendStatus(403);
            }
        }
        req.user = decodedToken;
        next();
    }
}


module.exports = authentication;