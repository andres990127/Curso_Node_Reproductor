// Archivo para la gestión de Json Web Tokens

// Importamos el modulo de JWT
const jwt = require('jsonwebtoken');

// Método para crear token y firmar, en el payload solo mandamos el identificador del usuario y el rol
const tokenSing = async (user) => {
    const sign =  jwt.sign({
        _id: user.id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "2h"
    });
    return sign;
};

// Método para verificar si el token tiene nuestra firma
const verifySing = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, process.env.JWT_SECRET);
    }catch(e){
        return null;
    };
};

// Se exportan los métodos
module.exports = {
    tokenSing,
    verifySing,
}