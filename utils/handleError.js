// Archivo para estandarización de respuestas HTTP

const handleHttpError = (e, res, message = 'Algo sucedió', code = 403)=>{
    console.error('[ERROR] ' + e);
    res.status(code);
    res.send({ error: message });
}

module.exports = handleHttpError;
