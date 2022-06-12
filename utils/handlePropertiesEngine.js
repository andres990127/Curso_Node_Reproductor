// Archivo para manejo de llamado de ID dependiendo del tipo de base de datos con el que se trabaje

// Obtenemos la base de datos con la que estamos trabajando
const ENGINE_BD = process.env.ENGINE_DB;

// Función que retorna el llamado al ID según la base de datos que se este manejando
const getProperties = () => {
    const data = {
        nosql:{
            id:'_id'
        },
        mysql:{
            id:'id'
        }
    }
    return data[ENGINE_BD]
};

// Se exporta la función
module.exports = getProperties;
