// Archivo para configurar el esquema de la colección(tabla) de usuarios

// Importamos mongoose para conectarnos a la db de mongo [https://cloud.mongodb.com/]
const mongoose = require('mongoose');

// Importamos plugin para borrado lógico de datos
const mongooseDelete = require('mongoose-delete');

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
            type: String,
            select: false
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

// Aplicamos el plugin de borrado lógico en el esquema actual y le decimos que mongooseDelete sobreescriba los metodos que actualmente tiene mongoose
userScheme.plugin(mongooseDelete, {overrideMethods: "all"});

// Exportamos el modelo de la colección(Tabla) "users"
module.exports = mongoose.model("users", userScheme);