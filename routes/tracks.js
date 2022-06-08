// Importamos express
const express = require('express');

// Importamos el manejador de rutas de express
const router = express.Router();

const customHeader = require('../middleware/customHeader');

// Se importa el validador para creación de track
const { validatorCreateItem } = require('../validators/tracks');

// Importamos el controlador correspondiente a la ruta "tracks"
const controller = require('../controllers/tracks');

// Para una petición get usamos la función getItems del controlador
router.get('/', controller.getItems);

// Para una petición get con identificador usamos la función getItem del controlador
router.get('/:id', controller.getItem);

// Para una petición post usamos la función createItem del controlador
router.post('/', validatorCreateItem, customHeader, controller.createItem);

// Exportamos el modulo
module.exports = router;