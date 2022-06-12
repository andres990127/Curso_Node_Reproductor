// Archivo para configurar el esquema de la tabla de Storage

// Importamos sequelize para definir el modelo
const { sequelize } = require('../../config/mySql');

// Importamos los tipos de datos para definirselos a los atributos del modelo
const { DataTypes } = require('sequelize');

// Definimos el esquema para la tabla de usuarios
const Storage = sequelize.define(
  "storages",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.NUMBER,
    }
  },
  {
    timestamps: true, // Registra la fecha de creación y modificación del registro
  }
);

// Exportamos el modelo de la Tabla "Storage"
module.exports = Storage;