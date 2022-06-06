// Importamos dotenv para usar las variables de entorno instanciadas en el archivo [.env]
require('dotenv').config();

// Importamos express para levantar un servicio web
const express = require('express');

// Importamos cors la cual permite evitar el error de origen cruzado entre navegadores
const cors = require('cors');

// Importamos nuestro modulo para conexión a la base de datos
const dbConnect = require('./config/mongo');

// Le llamamos al servidor 'app'
const app = express();

// Le decimos a la app que use cors
app.use(cors());

// Constante con el puerto, se obtiene de las variables de entorno
const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

// Le decimos a la aplicación que escuche por el puerto 3000
app.listen(port, () =>{
    console.log('Tu app esta lista por http://localhost:'+ port);
});

// Nos conectamos a la base de datos
dbConnect();