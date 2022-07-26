const yup = require('yup');

// regex qui vérifie que le mdp contient au moins un chiffre, une minuscule, une majuscule et un chiffre
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).+$/;

// on crée le model de validation pour le body du register

const registerValidator = yup.object({
    pseudo: yup.string().trim().required().min(3).max(50),
    email: yup.string().trim().email().required().max(255),
    firstname: yup.string().trim().required().max(150),
    lastname: yup.string().trim().required().max(150),
    password: yup.string().required().min(8).max(64).matches(pwdRegex)
    
});

const loginValidator = yup.object({
    credential: yup.string().required().trim().max(255),
    password: yup.string().required()
});

// on crée le model de validation pour le body du register

module.exports = {registerValidator, loginValidator}