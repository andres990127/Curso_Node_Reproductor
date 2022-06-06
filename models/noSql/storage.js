// Archivo para configurar el esquema de la colección(tabla) de almacenamiento

// Importamos mongoose para conectarnos a la db de mongo [https://cloud.mongodb.com/]
const mongoose = require('mongoose');

// Definimos el esquema para la colección(tabla) de almacenamiento
const storageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: Number
        },
    },
    {
        timestamps: true, // Registra la fecha de creación y modificación del registro
        versionKey: false // Evita que se cree una etiqueta de versión en el registro
    }
);

// Exportamos el modelo de la colección(Tabla) "storage"
module.exports = mongoose.model("storage", storageScheme);