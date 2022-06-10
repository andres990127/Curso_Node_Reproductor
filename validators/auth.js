// Archivo para hacer las validaciones de la información que se recibe para la validación del usuario

// Importamos "Check" para hacer validaciones
const { check } = require('express-validator');

// Importamos el manejador de validaciones por defecto el cual atrapa cualquier error de validación
const  validateResult  = require('../utils/handleValidator');

// Creamos la validación del envio de ID por parámetrps
const validateRegister = [
    check("name").exists().notEmpty(),
    check("age").exists().notEmpty().isNumeric({ min: 12, max: 99 }),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:8, max:15}),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];

// Creamos la validación del envio de ID por parámetrps
const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:3, max:15}),
    (req, res, next) => {
        validateResult(req, res, next); // Llamamos al manejador de validaciones
    },
];

// Exportamos las validaciones
module.exports = {
    validateRegister,
    validatorLogin,
}