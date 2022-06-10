// Archivo de funciones para la autenticación

// Importamos modulo para limpieza de datos basura de la petición entrante
const { matchedData } = require('express-validator');

// Importamos el modulo de Json Web Token
const { tokenSing } = require('../utils/handleJwt');

// Importamos nuestro modulo de encriptado y comparación de contraseñas
const { encrypt, compare } = require('../utils/handlePassword');

// Importamos el modelo
const { usersModel } = require('../models/index');

// Importamos el módulo de manejo de respuestas HTTP
const handleHttpError = require('../utils/handleError');

// Función para registrar un usuario
const RegisterCtrl = async (req, res) => {
    try {
        // Obtenemos la data limpia de la solicitud
        req = matchedData(req);

        // Encriptamos la contraseña que nos llegue
        const passwordHash = await encrypt(req.password);

        // Creamos un nuevo body y le cambiamos la contraseña que traia por la encriptada
        const body = { ...req, password: passwordHash };

        // Creamos el registro en la base de datos
        const dataUser = await usersModel.create(body);

        // Evitamos que se devuelva el valor de la contraseña en los datos que se devuelven
        dataUser.set("password", undefined, { strict: false });

        // Creamos la respuesta con el Json Web Token y la data del usuario creada
        const data = {
            token: await tokenSing(dataUser),
            user: dataUser,
        };

        // Retornamos la información
        res.send({ data });
    } catch (e) {
        handleHttpError(e, res, "Error en el registro de usuario");
    }
};

// Función para logear a una persona
const LoginCtrl = async (req, res) =>{
    try {
        // Limpiamos los datos para obtener solo los que necesitamos
        req = matchedData(req);

        // Buscamos si el correo electrónico enviado existe en la base de datos [Se selecciona la información que se quiere obtener al crear]
        const user = await usersModel.findOne({
            email: req.email
        }).select('password name rol email');

        // Si el correo electronico del usuario enviado no existe informamos
        if(!user){
            handleHttpError("El usuario no existe", res, "El usuario no existe", 404);
            return;
        };

        // Obtenemos el password del usuario en base de datos
        const hashPassword = user.password;

        // Comparamos si la contraseña enviada en la petición corresponde a la contraseña encriptada en base de datos
        const check = await compare(req.password, hashPassword);

        // Si las contraseñas no coinciden entonces se informa
        if(!check){
            handleHttpError("Contraseña incorrecta", res, "Contraseña incorrecta", 401);
            return;
        };

        // Quitamos la contraseña de la información a retornar del usuario
        user.set('password', undefined, {strict:false});

        // Armamos la información a retornar
        const data = {
            token: await tokenSing(user),
            user: user
        };

        // Respondemos con la información armada previamente
        res.send({data});

    } catch (e) {
        handleHttpError(e, res, "Error en el login de usuario");
    }
};

module.exports = {
    RegisterCtrl,
    LoginCtrl
};