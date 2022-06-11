// Importamos dotenv para usar las variables de entorno instanciadas en el archivo [.env]
require('dotenv').config();

// Importamos express para levantar un servicio web
const express = require('express');

// Importamos cors la cual permite evitar el error de origen cruzado entre navegadores
const cors = require('cors');

// Importamos el modulo para monitoriear peticiones
const morganBody = require('morgan-body');

// Importamos nuestro modulo de interacción con SLACK
const loggerStream = require('./utils/handleLogger');

// Importamos nuestro modulo para conexión a la base de datos
const dbConnect = require('./config/mongo');

// Le llamamos al servidor 'app'
const app = express();

// Le decimos a la app que use cors
app.use(cors());

// Le decimos a la app que se prepare para leer json que vengan en el body
app.use(express.json());

// Se exponen los recursos públicos, en este caso los archivos guardados en la carpeta "storage" [http://localhost:3001/file-1654637701010.png]
app.use(express.static("storage"));

// Le decimos al monitor de errores que use nuestra app [Como un sniffer]
morganBody(app, {
    noColors: true, // Mensajes enviados sin colores
    stream: loggerStream, // Enviar solo los mensajes que pasen por loggerStream
    skip: (req, res) => {
        return res.statusCode < 400 // Solo se envian mensajes de error
    }
});

// Constante con el puerto, se obtiene de las variables de entorno
const port = process.env.PORT || 3000;

// Se redirige al archivo de rutas para que accese a su respectiva ruta
app.use("/api", require("./routes"));

// Le decimos a la aplicación que escuche por el puerto 3000
app.listen(port, () =>{
    console.log('Tu app esta lista por http://localhost:'+ port);
});

// Nos conectamos a la base de datos
dbConnect();