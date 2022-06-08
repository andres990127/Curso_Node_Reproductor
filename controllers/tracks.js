// Archivo de funciones para canciones

// Importamos modulo para limpieza de datos basura de la petición entrante
const { matchedData } = require('express-validator');

// Importamos el modelo
const { tracksModel } = require('../models/index');

// Importamos el módulo de manejo de respuestas HTTP
const handleHttpError = require('../utils/handleError');

// Obtiene una lista de canciones [¡Debe ser asincrona toda función que tenga un AWAIT adentro!]
const getItems = async (req, res) => {

    try {

        // Obtenemos todos los registros de canciones de la base de datos
        const data = await tracksModel.find({});

        // Respondemos con la data obtenida
        res.send({ data });

    } catch (e) {
        handleHttpError(req, "Error en obtención de tracks");
    };
};

// Obtiene un detalle de canción
const getItem = async (req, res)=>{
    //ToDo
};

// Crea un registro de canción
const createItem = async (req, res) => {

    try {

        // Limpiamos los datos recibidos para asegurarnos de que solo vengan los que necesitamos y ninguno extra
        req = matchedData(req);

        // Obtenemos el json que nos envien en el body
        const body = req.body;

        // Creamos el nuevo registro en nuestra base de datos
        const data = await tracksModel.create(body);

        // Respondemos con el resultado que no de esa creación
        res.send(data);

    } catch (e) {
        handleHttpError(req, "Error en la creación de tracks");
    };


};

// Actualiza un registro de canción
const updateItem = async (req, res)=>{
    //ToDo
};

// Elimina un registro de canción
const deleteItem = async (req, res)=>{
    //ToDo
};

// Exportamos el módulo
module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};