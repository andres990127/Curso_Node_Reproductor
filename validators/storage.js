// Archivo para hacer las validaciones de la información que se recibe para el schema de "tracks"

// Importamos "Check" para hacer validaciones
const { check } = require('express-validator');

// Importamos el manejador de validaciones por defecto el cual atrapa cualquier error de validación
const  validateResult  = require('../utils/handleValidator');

// Creamos la validación del envio de ID por parámetrps
const validateParamId = [
    check("id").exists().isMongoId(),
    (req, res, next) => {
        validateResult(req, res, next); // Llamamos al manejador de validaciones
    },
];

// Exportamos la validación d la creación de item de track
module.exports = {
    validateParamId,
}