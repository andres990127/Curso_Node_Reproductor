// Archivo para cofiguración de conexión y envio de mensajes a SLACK

// Importamos el modulo para generar conexión con SLACK
const { IncomingWebhook } = require('@slack/webhook');

// Creamos la conexión al SLACK
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

// Función para enviar los mensajes al SLACK [Aquí se agregarian otros programas como SLACK si se requiere]
const loggerStream = {
    write: message => {
        webHook.send({
            text: message,
        });
    },
};

module.exports = loggerStream;