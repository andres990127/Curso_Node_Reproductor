// Importamos express
const express = require('express');

// Importamos el controlador correspondiente a la ruta "storage"
const controller = require('../controllers/auth');

// Importamos el manejador de rutas de express
const router = express.Router();

// Se importa el validador para gestión de storage
const validators = require('../validators/auth');

// Para una petición post de registro usamos RegisterCtrl
router.post('/register', validators.validateRegister, controller.RegisterCtrl);

// Para una petición post de login usamos LoginCtrl
router.post('/login', validators.validatorLogin, controller.LoginCtrl);

// Exportamos el modulo
module.exports = router;