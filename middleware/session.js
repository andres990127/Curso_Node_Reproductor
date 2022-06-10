// Middleware para verificar que en la petición se encuentre el Json Web Token

// Importamos el módulo de manejo de respuestas HTTP
const handleHttpError = require('../utils/handleError');

// Importamos el modulo de Json Web Token
const { verifySing } = require('../utils/handleJwt');

// Importamos el modulo de usuarios
const { usersModel } = require('../models');

// Función para comprobar que llegue el token JWT en la petición
const authMiddleware = async (req, res, next) => {
    try{
        // Si el token no viene entonces se envia el error
        if(!req.headers.authorization){
            handleHttpError("No se encuentra el token JWT en el encabezado", res, "No se encuentra el token JWT en el encabezado", 401);
            return;
        };

        // Obtenemos el token pero le sacamos la palabra "bearer" con la que llega
        const token = req.headers.authorization.split(' ').pop();

        // Verificamos si ese token que llega fue firmado por nosotros
        const dataToken = await verifySing(token);

        // Si en el payload del token no existe un ID entonces se envia el error
        if(!dataToken._id){
            handleHttpError("No se encuentra el ID en el JWD", res, "No se encuentra el ID en el JWD", 401);
            return;
        };

        // Consulto el usuario que me está haciendo la petición dado su ID en el token que me envia
        const user = await usersModel.findById(dataToken._id);

        // Añadimos la información del usuario a los datos del request
        req.user = user;

        // Si se cumplen todas las condiciones el middleware termina y deja pasar
        next();

    }catch(e){
        handleHttpError(e, res, "Error de sesión", 401);
    };
};

module.exports = authMiddleware;