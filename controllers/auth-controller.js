const User = require("../models/user-model");
const jwtUtils = require('../utils/jwt-utils')

const argon2 = require('argon2');

const authController = {
    login: async (req,res)=>{
        //pour se loger, on va recevoir un identifiant et un mdp et on va devoir vérifier si un utilistaeur correspond à ces données
        const {credential, password} = req.body;
        // on construit notre filtre: 
        const credentialFIlter = { $or: [{email: credential}, {pseudo: credential}]}
        const user = await User.findOne(credentialFIlter);
        // on vérifie si on a recupéré un utilistaeur
        if(!user){
            //si pas
            return res.status(401).json({error: 'Bad credentials'}) // 401 -> Unauthorized. Pas les bonnes infos de login
        }
        // so on a un utilisateur, on doit vérifier si son mdp est présent dans le req.body
        const isPasswordValid = await argon2.verify(user.password, password)
        if(!isPasswordValid){
            return res.status(401).json({error: 'Bad credentials'})
        }
        // renvoyer un token
        const token = await jwtUtils.generate(user);
        return res.json({token});
    },
    register: async (req,res)=>{
        //pour enregistrer un ouvel utilisateur, on ne va pas stocker son mdp en clair dan la bdd
        //on va devoir le hash

        // on récupère dans le body, les infos qui nous intéressent pour faire un nouvel utilistaeur
        const {pseudo, email, lastname, firstname, password} = req.body;

        //hashage du PWD
        const hashedPassword = await argon2.hash(password);

        //on crée un nouvel utilisateur à rentrer en db à partir des infos sur req.body SAUF LE PASSWORD qu'on ne stocke jamais en clair
        const userToInsert = User({
            pseudo,
            email,
            lastname,
            firstname,
            password: hashedPassword // pour le MDP de notre user à insérer en db, on fourni le mdp hashé
        });
        await userToInsert.save();
        const token = await jwtUtils.generate(userToInsert);
        res.status(200).json({token});

    }
}


module.exports = authController;