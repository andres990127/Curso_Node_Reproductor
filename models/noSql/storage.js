// Archivo para configurar el esquema de la colección(tabla) de almacenamiento

// Importamos mongoose para conectarnos a la db de mongo [https://cloud.mongodb.com/]
const mongoose = require('mongoose');

// Importamos plugin para borrado lógico de datos
const mongooseDelete = require('mongoose-delete');

// Definimos el esquema para la colección(tabla) de almacenamiento
const storageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        },
    },
    {
        timestamps: true, // Registra la fecha de creación y modificación del registro
        versionKey: false // Evita que se cree una etiqueta de versión en el registro
    }
);

// Aplicamos el plugin de borrado lógico en el esquema actual y le decimos que mongooseDelete sobreescriba los metodos que actualmente tiene mongoose
storageScheme.plugin(mongooseDelete, {overrideMethods: "all"});

// Exportamos el modelo de la colección(Tabla) "storage"
module.exports = mongoose.model("storage", storageScheme);