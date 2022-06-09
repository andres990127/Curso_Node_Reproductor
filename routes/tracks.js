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

// Para una petición get usamos la función getItems del controlador
router.get('/', controller.getItems);

// Para una petición get con identificador usamos la función getItem del controlador
router.get('/:id', validators.validateParamId, controller.getItem);

// Para una petición post usamos la función createItem del controlador
router.post('/', validators.validatorCreateItem, customHeader, controller.createItem);

// Para una petición post usamos la función updateItem del controlador
router.patch('/:id', validators.validateParamId, validators.validatorCreateItem, controller.updateItem);

// Para una petición delete usamos la función deleteItem del controlador
router.delete('/:id', validators.validateParamId, validators.validatorCreateItem, controller.deleteItem);

// Exportamos el modulo
module.exports = router;