//on importe notre module
const jwt = require('jsonwebtoken');


const { JWT_AUDIENCE, JWT_ISSUER, JWT_SECRET} = process.env;

const jwtUtils = {
    //fonction pour générer un token
    generate: ({id, pseudo, role}) => {
        // notre fct generate doit renvoyer une promesse pour qu'on puisse vérifier
        return new Promise((resolve, reject)=>{
            //on récupère nos données pour créer le payload
            const payload = {id, pseudo, role};

            //création des options du header
            const options = {
                algorithm: 'HS512',
                expiresIn: '12h',
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            }
            //pour générer un token, ns aurons tjs besoin d'un header/options, d'un payload, du secret (jamais de pwd !!!)
            // jwt.sign('payload', 'secret', 'options/header', (error, token)=>{})
            jwt.sign(payload, JWT_SECRET, options, (error, token)=>{
                if(error){
                    //si notre généartion de token a produit une erreur, on passe notre promesse en rejetée
                    return reject(error)
                }
                // si la génération du token à fonctionné, on résoud la requête en fournissant le token généré
                resolve(token);
            })
        });
    },
    
    //fonction pour décoder un token
    decode: (token)=>{
        //dans le cas où on a pas de token
        if(!token){
            return Promise.reject(new Error('No Token'));
        }
        //sinon on renvoie une promesse
        return new Promise((resolve, reject)=>{
            //on crée les options pour faire notre décodage
            const options = {
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            }
            jwt.verify(token, JWT_SECRET, options, (error, payload)=>{
                if(error){
                    return reject(error);
                }
                resolve(payload);
            })
        })

    },
    
}

module.exports = jwtUtils;