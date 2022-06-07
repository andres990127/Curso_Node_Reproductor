// Importamos express
const express = require('express');

// Importamos el manejador de rutas de express
const router = express.Router();

// Importamos el controlador correspondiente a la ruta "storage"
const controller = require('../controllers/storage');

// Importamos el modulo del manejador de archivo [Multer]
const uploadMiddleware = require('../utils/handleStoragel');

// Para una petición post usamos la función ########## del controlador, se le envia el middleware en los parámetros para gestionar los archivos entrantes
router.post('/', uploadMiddleware.single("myfile"), controller.createItem);

// Exportamos el modulo
module.exports = router;