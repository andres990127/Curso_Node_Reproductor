// Archivo de configuración de mySql

// Importamos sequelize para crear la conexión a mySql
const { Sequelize } = require('sequelize');

// Declaramos variables de conexión
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

// Se instancia sequelize
const sequelize =  new Sequelize(
    database,
    username,
    '',
    {
        host: host,
        dialect:"mysql",
    }
);

// Función de conexión a la base de datos
const dbConnectMySql = async () =>{
    try{
        await sequelize.authenticate();
        console.log/('MYSQL conexión correcta');
    }catch(e){
        console.log('MYSQL Error de conexión ' + e);
    }
};

// Exportamos funciones
module.exports = {
    sequelize,
    dbConnectMySql,
};