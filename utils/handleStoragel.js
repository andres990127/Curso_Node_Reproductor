// Archivo para gestionar el guardado de archivos entrantes desde la petición post

// Importamos multer para el manejo de archivos
const multer = require('multer');

// Se configura el gestor de archivos [Middleware]
const storage = multer.diskStorage({

    // Se ubica un directorio en el que se guardarán los archivos que recibamos
    destination: (req, file, cb) =>{
        const pathStorage = `${__dirname}/../storage`; // Se guardan los archivos en la carpeta "storage"
        cb(null, pathStorage); // La ubicación de la carpeta a guardar se envia en el cb y el null refiere a que no hay errores
    },

    // Asignamos el nombre con el que vamos a guardar los archivos
    filename: (req, file, cb) =>{
        const ext = file.originalname.split(".").pop(); // Extraemos la extensión del archivo
        const filename = `file-${Date.now()}.${ext}`; // Le damos el nombre al archivo como "file-", un número aleatorio dependiendo la fecha y la extensión
        cb(null, filename); // El nombre del archivo a guardar se envia en el cb y el null refiere a que no hay errores 
    }
});

// Usamos el middleware anteriormente creado
const uploadMiddleware = multer({
    storage: storage
});

module.exports = uploadMiddleware;