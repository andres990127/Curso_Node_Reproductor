// Importamos express
const express = require('express');

// Importamos el manejador de rutas de express
const router = express.Router();

// Se importa el validador para gestión de storage
const validators = require('../validators/auth');

// Importamos modulo para limpieza de datos basura de la petición entrante
const { matchedData } = require('express-validator');

// Importamos nuestro modulo de encriptado y comparación de contraseñas
const { encrypt, compare } = require('../utils/handlePassword');

// Importamos el modelo
const { usersModel } = require('../models/index');

// Para una petición post usamos la función createItem del controlador
router.post('/register', validators.validateRegister, async (req, res) =>{

    // Obtenemos la data limpia de la solicitud
    req = matchedData(req);

    // Encriptamos la contraseña que nos llegue
    const passwordHash = await encrypt(req.password);

    // Creamos un nuevo body y le cambiamos la contraseña que traia por la encriptada
    const body = {...req, password: passwordHash};

    // Creamos el registro en la base de datos
    const data = await usersModel.create(body);

    // Evitamos que se devuelva el valor de la contraseña en los datos que se devuelven
    data.set("password", undefined, {strict:false});


    // Retornamos el body con la contraseña modificada
    res.send({data});
});

// Para una petición post usamos la función createItem del controlador
router.post('/login', (req, res) =>{

});

// Exportamos el modulo
module.exports = router;