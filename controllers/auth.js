// Archivo de funciones para la autenticación

// Importamos modulo para limpieza de datos basura de la petición entrante
const { matchedData } = require('express-validator');

// Importamos el modulo de Json Web Token
const { tokenSing } = require('../utils/handleJwt');

// Importamos nuestro modulo de encriptado y comparación de contraseñas
const { encrypt } = require('../utils/handlePassword');

// Importamos el modelo
const { usersModel } = require('../models/index');

const loginCtrl = async (req, res) =>{

    // Obtenemos la data limpia de la solicitud
    req = matchedData(req);

    // Encriptamos la contraseña que nos llegue
    const passwordHash = await encrypt(req.password);

    // Creamos un nuevo body y le cambiamos la contraseña que traia por la encriptada
    const body = {...req, password: passwordHash};

    // Creamos el registro en la base de datos
    const dataUser = await usersModel.create(body);

    // Evitamos que se devuelva el valor de la contraseña en los datos que se devuelven
    dataUser.set("password", undefined, {strict:false});

    // Creamos la respuesta con el Json Web Token y la data del usuario creada
    const data = {
        token: await tokenSing(dataUser),
        user: dataUser,
    };

    // Retornamos la información
    res.send({data});
};

module.exports = {
    loginCtrl,
}