// Middleware para verificar si el rol de la persona tiene permisos para hacer la petición

// Importamos el módulo de manejo de respuestas HTTP
const handleHttpError = require('../utils/handleError');

// Función para validar si el rol que recibe lo trae el usuario que hizo la petición, recibe los roles permitidos
const checkRol = (roles) => (req, res, next) => {
    try{
        // Obtenemos el usuario que hace la petición
        const { user } = req;

        // Obtenemos el rol del usuario que hace la petición
        const rolesByUser = user.rol;

        // Revisamos que el usuario que hace la petición tenga el rol que esta permitido (Los roles permitidos se reciben como parámetro)
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));

        // Revisamos que el usuario tenga por lo menos un rol de los permitidos, sino se envia el error
        if(!checkValueRol){
            handleHttpError("El usuario no tiene los permisos para hacer esta acción", res, "El usuario no tiene los permisos para hacer esta acción", 403);
            return;
        };

        // Si las validaciones se cumplen se deja seguir el flujo
        next();

    }catch(e){
        handleHttpError(e, res, "Error al validar el rol del usuario", 403);
    }
};

module.exports = checkRol;