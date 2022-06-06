// Archivo de configuración de mongo

// Importamos dotenv para usar las variables de entorno instanciadas en el archivo [.env]
require('dotenv').config();

// Importamos mongoose para conectarnos a la db de mongo [https://cloud.mongodb.com/]
const mongoose = require('mongoose');

// Funcion para conectarnos a la base de datos
const dbConnect = () =>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if(!err){
            console.log('Conectado a la base de datos');
        } else{
            console.error('Error de conexión a la base de datos');
        };
    });
};

// Exportamos la función de conexión
module.exports = dbConnect;