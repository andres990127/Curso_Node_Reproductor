// Archivo de funciones para almacenamiento

// Importamos el modulo de fileSystem
const fs = require('fs');

// Importamos el modelo
const { storageModel } = require('../models/index');

// Importamos el módulo de manejo de respuestas HTTP
const handleHttpError = require('../utils/handleError');

// Importamos modulo para limpieza de datos basura de la petición entrante
const { matchedData } = require('express-validator');

// Obtiene una lista de storage [¡Debe ser asincrona toda función que tenga un AWAIT adentro!]
const getItems =  async (req, res)=>{

    try {
        // Obtenemos todos los registros de canciones de la base de datos
        const data = await storageModel.find({});

        // Respondemos con la data obtenida
        res.send({ data });
    } catch (e) {
        handleHttpError(e, res, "Error en la obtención de los storage");
    };

};

// Obtiene un detalle de storage
const getItem = async (req, res)=>{
    try {
        // Obtenemos el ID enviado por parámetros filtrando los datos no deseados
        const { id } = matchedData(req);

        // Obtenemos el registro de storage que se solicita
        const data = await storageModel.findById(id);

        // Respondemos con la data obtenida
        res.send({ data });

    } catch (e) {
        handleHttpError(e, res, "Error en obtención del storage");
    };
};

// Crea un registro de storage
const createItem = async (req, res)=>{
    
    // Obtenemos el nombre del archivo que se suba
    const { file } = req;

    const fileData = {
        filename: file.filename,
        url: process.env.PUBLIC_URL + '/' + file.filename,
    }

    // Creamos el nuevo registro en nuestra base de datos
    const data = await storageModel.create(fileData);

    // Respondemos con el resultado que no de esa creación
    res.send(data);
};

// Elimina un registro de storage
const deleteItem = async (req, res)=>{
    try {
        // Obtenemos el ID enviado por parámetros filtrando los datos no deseados
        const { id } = matchedData(req);

        // Obtenemos el registro de storage que se solicita
        const dataFile = await storageModel.findById(id);

        // Obtenemos el nombre del archivo vinculado al registro a eliminar
        const { filename } = dataFile;

        // Obtenemos la dirección exacta del archivo
        const filePath = `${__dirname}/../storage/${filename}`;

        // Eliminamos el archivo vinculado al registro a eliminar
        fs.unlinkSync(filePath);

        // Armamos datos para responder eliminación exitosa
        const data = {
            filePath,
            deleted:1
        };

        // Eliminamos el registro de mongo
        await storageModel.deleteOne({_id: id});

        // Respondemos los datos armados
        res.send({ data });

    } catch (e) {
        handleHttpError(e, res, "Error en obtención del storage");
    };
};

// Exportamos el módulo
module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem
};