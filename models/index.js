// Archivo para direccionamiento dinámico a los modelos de las entidades dependiendo al tipo de base de datos

// Obtenemos el tipo de base de datos a utilizar 
const ENGINE_DB = process.env.ENGINE_DB;

// Modificamos dinamicamente el path dependiendo al tipo de base de datos a usar
const pathModels = (ENGINE_DB === 'nosql') ? './nosql' : './mysql';

// Definimos los modelos a usar
const models = {
    usersModel: require(pathModels + '/users'),
    tracksModel: require(pathModels + '/tracks'),
    storageModel: require(pathModels + '/storage'),
};

// Exportamos los modelos
module.exports = models;