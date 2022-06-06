// Archivo para configurar el esquema de la colección(tabla) de usuarios

// Importamos mongoose para conectarnos a la db de mongo [https://cloud.mongodb.com/]
const mongoose = require('mongoose');

// Definimos el esquema para la colección(tabla) de usuarios
const userScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        rol: {
            type:["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: true, // Registra la fecha de creación y modificación del registro
        versionKey: false // Evita que se cree una etiqueta de versión en el registro
    }
);

// Exportamos el modelo de la colección(Tabla) "users"
module.exports = mongoose.model("users", userScheme);