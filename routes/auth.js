// Importamos express
const express = require('express');

// Importamos el controlador correspondiente a la ruta "storage"
const controller = require('../controllers/auth');

// Importamos el manejador de rutas de express
const router = express.Router();

// Se importa el validador para gestión de storage
const validators = require('../validators/auth');

// Para una petición post usamos la función createItem del controlador
router.post('/register', validators.validateRegister, controller.loginCtrl);

// Para una petición post usamos la función createItem del controlador
router.post('/login', (req, res) =>{

});

// Exportamos el modulo
module.exports = router;