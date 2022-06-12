// Archivo para estandarización de respuestas HTTP

// Función para responder con un error
const handleHttpError = (e, res, message = 'Algo sucedió', code = 403)=>{
    console.error('[ERROR] ' + e);
    res.status(code);
    res.send({ error: message, e });
};

module.exports = handleHttpError;
