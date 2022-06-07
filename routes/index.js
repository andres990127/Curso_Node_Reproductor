// Archivo para redireccionar las peticiones a la ruta correspondiente

// Importamos express
const express = require('express');

// Importamos el fileSystem
const fs = require('fs');

// Importamos el manejador de rutas de express
const router = express.Router();

// Constante que almacena la ubicación de este archivo
const PATH_ROUTES = __dirname;

// Función para dividir el nombre de un archivo Ej:[tracks.js --> [tracks, js]] y obtener solo el primero
const removeExtension = (fileName =>{
    return fileName.split('.').shift();
});

// Obtenemos los archivos que se encuentren dentro de la carpeta 'routes'
fs.readdirSync(PATH_ROUTES).filter(file =>{

    // Obtenemos los nombres de todos los archivos que se encuentren dentro de la carpeta routes pero le quitamos la extensión .js
    const name = removeExtension(file);

    // Emparejamos todos los nombres encontrados en routes con su respectivo archivo de rutas Ej: [/tracks va con tracks.js]
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`));
    };
});

// Exportamos el modulo
module.exports = router;