// Importamos express
const express = require('express');

// Importamos el manejador de rutas de express
const router = express.Router();

router.get('/', (req, res) =>{
    
    const data = ["Hola", "mundo"];
    
    res.send({data});
})

// Exportamos el modulo
module.exports = router;