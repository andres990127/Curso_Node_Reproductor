// Archivo de funciones para canciones

// Importamos el modelo
const { tracksModel } = require('../models/index');

// Obtiene una lista de canciones [¡Debe ser asincrona toda función que tenga un AWAIT adentro!]
const getItems =  async (req, res)=>{

    // Obtenemos todos los registros de canciones de la base de datos
    const data = await tracksModel.find({});
    
    // Respondemos con la data obtenida
    res.send({data});
};

// Obtiene un detalle de canción
const getItem = (req, res)=>{
    //ToDo
};

// Crea un registro de canción
const createItem = async (req, res)=>{
    
    // Obtenemos el json que nos envien en el body
    const body = req.body;

    // Creamos el nuevo registro en nuestra base de datos
    const data = await tracksModel.create(body);

    // Respondemos con el resultado que no de esa creación
    res.send(data);
};

// Actualiza un registro de canción
const updateItem = (req, res)=>{
    //ToDo
};

// Elimina un registro de canción
const deleteItem = (req, res)=>{
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