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
        handleHttpError(e, res, "Error en obtención de tracks");
    };
};

// Obtiene un detalle de canción
const getItem = async (req, res)=>{
    try {
        // Obtenemos el registro de canción que se solicita
        const data = await tracksModel.findById(req.params.id);

        // Respondemos con la data obtenida
        res.send({ data });

    } catch (e) {
        handleHttpError(e, res, "Error en obtención de track");
    };
};

// Crea un registro de canción
const createItem = async (req, res) => {

    try {
        // Obtenemos el json que nos envien en el body asegurarnos de que solo vengan los que necesitamos y ninguno extra
        const body = matchedData(req);

        // Creamos el nuevo registro en nuestra base de datos
        const data = await tracksModel.create(body);

        // Respondemos con el resultado que no de esa creación
        res.send(data);

    } catch (e) {
        handleHttpError(e, res, "Error en la creación de tracks");
    };


};

// Actualiza un registro de canción
const updateItem = async (req, res)=>{
    try {
        // Obtenemos el json que nos envien en el body asegurarnos de que solo vengan los que necesitamos y ninguno extra
        const body = matchedData(req);

        // Modificamos el registro en nuestra base de datos pasandole primero el id y luego el cuerpo con la nueva información
        const data = await tracksModel.findOneAndUpdate(
            {_id: req.params.id},
            body,
        );

        // Respondemos con el resultado que no de esa creación
        res.send(data);

    } catch (e) {
        handleHttpError(e, res, "Error en la actualización del track");
    };
};

// Elimina un registro de canción
const deleteItem = async (req, res)=>{
    try {
        // Eliminamos el registro en nuestra base de datos pasandole el id (Borrado lógico!)
        const data = await tracksModel.delete({
            _id: req.params.id
        });

        // Respondemos con el resultado que no de esa creación
        res.send(data);

    } catch (e) {
        handleHttpError(e, res, "Error en la eliminación de track");
    };
};

// Exportamos el módulo
module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};