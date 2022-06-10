// Archivo para encriptar y comparar hash

const bcryptjs = require("bcryptjs");

// Función para encriptar, recibe la contraseña sin encriptar
const encrypt = async (passwordPlain) =>{
    const hash = await bcryptjs.hash(passwordPlain, 10);
    return hash;
};


// Función para comparar hash, recibe la contraseña plana y encriptada para comparar
const compare = async (passwordPlain, hashPassword) =>{
    return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = {
    encrypt,
    compare,
}