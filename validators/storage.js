// Archivo para hacer las validaciones de la información que se recibe para el schema de "storage"

// Importamos "Check" para hacer validaciones
const { check } = require('express-validator');

// Importamos el manejador de validaciones por defecto el cual atrapa cualquier error de validación
const  validateResult  = require('../utils/handleValidator');

// Creamos la validación del envio de ID por parámetrps
const validateParamId = [
    check("id").exists(),
    (req, res, next) => {
        validateResult(req, res, next); // Llamamos al manejador de validaciones
    },
];

// Exportamos las validaciones
module.exports = {
    validateParamId,
}