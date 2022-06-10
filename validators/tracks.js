// Archivo para hacer las validaciones de la información que se recibe para el schema de "tracks"

// Importamos "Check" para hacer validaciones
const { check } = require('express-validator');

// Importamos el manejador de validaciones por defecto el cual atrapa cualquier error de validación
const  validateResult  = require('../utils/handleValidator');

// Creamos la validación para la creación de un item de track
const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("album").exists().notEmpty(),
    check("cover").exists().notEmpty().isURL(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty(),
    check("artist.nickname").exists().notEmpty(),
    check("artist.nationality").exists().notEmpty(),
    check("duration.start").exists().notEmpty(),
    check("duration.end").exists().notEmpty(),
    check("mediaId").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        validateResult(req, res, next); // Llamamos al manejador de validaciones
    },
];

// Creamos la validación del envio de ID por parámetrps
const validateParamId = [
    check("id").exists().isMongoId(),
    (req, res, next) => {
        validateResult(req, res, next); // Llamamos al manejador de validaciones
    },
];

// Exportamos las validaciones
module.exports = {
    validatorCreateItem,
    validateParamId,
}