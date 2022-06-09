// Archivo para configurar el esquema de la colección(tabla) de canciones

// Importamos mongoose para conectarnos a la db de mongo [https://cloud.mongodb.com/]
const mongoose = require('mongoose');

// Importamos plugin para borrado lógico de datos
const mongooseDelete = require('mongoose-delete');

// Definimos el esquema para la colección(tabla) de canciones
const tracksScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true, // Registra la fecha de creación y modificación del registro
        versionKey: false // Evita que se cree una etiqueta de versión en el registro
    }
);

// Aplicamos el plugin de borrado lógico en el esquema actual y le decimos que mongooseDelete sobreescriba los metodos que actualmente tiene mongoose
tracksScheme.plugin(mongooseDelete, {overrideMethods: "all"});

// Exportamos el modelo de la colección(Tabla) "canciones"
module.exports = mongoose.model("tracks", tracksScheme);