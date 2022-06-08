// Archivo para creación de middleware para verificacion de información del header

// Funcion para llamar como middleware para verificar que venga algo en especial en el header [Nos aseguramos que venga un api_key con valor "andres0127"]
const customHeader = (req, res, next) =>{
    try{
        const apiKey = req.headers['api_key'];
        if(apiKey === 'andres0127'){
            next();
        }else{
            res.status(403);
            res.send({error: "ApiKey incorrecto"});
        }
    }catch(e){
        res.status(403);
        res.send({error: "Algo ocurrió en el custom header"});
    }
};

module.exports = customHeader;