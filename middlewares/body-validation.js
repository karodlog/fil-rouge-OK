

const bodyValidation =  (yupValidator)=>{
    return async (req, res, next)=>{
        //on essaie de passer la validation
        try{
            // si on arrive ici depuis la route /api/category/:
            //yupValidator contient notre categoryValidator donc on va déclencher notre validation sur notre categoryValidator
            const validData = await yupValidator.noUnknown().validate(req.body, {abortEarly: false});
            // on remplace req.body qui contient potentiellement des données en plus que ce que l'on souhaite par validData qui a été nettoyé des données qu'on ne souhaite pas insérer
            req.body = validData;
            //on continue la requete
            next();

        }
        // si on a une erreur on renverra bad request
        catch(e){
            return res.sendStatus(400);
        }
    }
}

module.exports = bodyValidation;