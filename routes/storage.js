// Importamos express
const express = require('express');

// Importamos el manejador de rutas de express
const router = express.Router();

// Se importa el validador para gestión de storage
const validators = require('../validators/storage');

// Importamos el controlador correspondiente a la ruta "storage"
const controller = require('../controllers/storage');

// Importamos el modulo del manejador de archivo [Multer]
const uploadMiddleware = require('../utils/handleStoragel');

// Para una petición get con ID usamos la función getItem del controlador
router.get('/', controller.getItems);

// Para una petición get con ID usamos la función getItem del controlador
router.get('/:id', validators.validateParamId, controller.getItem);

// Para una petición post usamos la función createItem del controlador, se le envia el middleware en los parámetros para gestionar los archivos entrantes
router.post('/', uploadMiddleware.single("myfile"), controller.createItem);

// Para una petición delete con ID usamos la función deleteItem del controlador
router.delete('/:id', validators.validateParamId, controller.deleteItem);

// Exportamos el modulo
module.exports = router;