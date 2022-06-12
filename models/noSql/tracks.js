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

// Se implementa metodo propio 'findAllData' con relación a Storage, esto permite que cambie el campo "mediaId" de los registros que traiga el track 
// por el registro equivalente con ese ID en storage
tracksScheme.statics.findAllData = function(){
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages", // Relación desde 'tracks' hacia 'storage'
                localField: "mediaId", // Join entre tracks.mediaId
                foreignField: "_id",  // y storages._id
                as: "audio", // Resultado es igual a un alias 'audio'
            },
        },
        {
            $unwind: "$audio" // Limitamos a que el resultado de la relación solo traiga 1 registro
        }
    ])
    return joinData;
};

// Se implementa metodo propio 'findOneData' con relación a Storage, esto permite que cambie el campo "mediaId" de los registros que traiga el track 
// por el registro equivalente con ese ID en storage
tracksScheme.statics.findOneData = function(id){
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages", // Relación desde 'tracks' hacia 'storage'
                localField: "mediaId", // Join entre tracks.mediaId
                foreignField: "_id",  // y storages._id
                as: "audio", // Resultado es igual a un alias 'audio'
            },
        },
        {
            $unwind: "$audio" // Limitamos a que el resultado de la relación solo traiga 1 registro
        }
    ])
    return joinData;
};

// Aplicamos el plugin de borrado lógico en el esquema actual y le decimos que mongooseDelete sobreescriba los metodos que actualmente tiene mongoose
tracksScheme.plugin(mongooseDelete, {overrideMethods: "all"});

// Exportamos el modelo de la colección(Tabla) "canciones"
module.exports = mongoose.model("tracks", tracksScheme);