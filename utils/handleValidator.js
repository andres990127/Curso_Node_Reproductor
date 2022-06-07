// Archivo para el manejador de las validaciones de información que se envien en los body's

// Importamos modulo que verifica cualquier error en las validaciones
const { validationResult } = require('express-validator');

// Función por defecto para evaluar validaciones
const validateResult = ( req, res, next ) => {
    try{
        validationResult(req).throw();
        return next(); // Continua hacia el controlador
    } catch (err){
        res.status(403);
        res.send({ errors: err.array() });
    };
};

// Se exporta la función
module.exports = validateResult;