// Importamos express
const express = require('express');

// Importamos el manejador de rutas de express
const router = express.Router();

// Importamos validador para requerir algo en el header de la petición
const customHeader = require('../middleware/customHeader');

// Se importa el validador para gestión de tracks
const validators = require('../validators/tracks');

// Importamos el controlador correspondiente a la ruta "tracks"
const controller = require('../controllers/tracks');

// Importamos nuestro modulo para la verificación del Json Web Token
const authMiddleware = require('../middleware/session');

// Importamos nuestro modulo para la verificación del rol de la persona que hace la petición
const checkRol = require('../middleware/rol');

// Para una petición get usamos la función getItems del controlador
router.get('/', authMiddleware, controller.getItems);

// Para una petición get con identificador usamos la función getItem del controlador
router.get('/:id', authMiddleware, validators.validateParamId, controller.getItem);

// Para una petición post usamos la función createItem del controlador
router.post('/', authMiddleware, checkRol(["user","admin"]), validators.validatorCreateItem, customHeader, controller.createItem);

// Para una petición post usamos la función updateItem del controlador
router.patch('/:id', authMiddleware, validators.validateParamId, validators.validatorCreateItem, controller.updateItem);

// Para una petición delete usamos la función deleteItem del controlador
router.delete('/:id', authMiddleware, validators.validateParamId, validators.validatorCreateItem, controller.deleteItem);

// Exportamos el modulo
module.exports = router;