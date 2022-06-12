// Archivo para configurar el esquema de la tabla de usuarios

// Importamos sequelize para definir el modelo
const { sequelize } = require('../../config/mySql');

// Importamos los tipos de datos para definirselos a los atributos del modelo
const { DataTypes } = require('sequelize');

// Definimos el esquema para la tabla de usuarios
const User = sequelize.define(
    "users",
    {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.NUMBER,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        rol: {
          type: DataTypes.ENUM(["user", "admin"]),
        },
      },
    {
        timestamps: true, // Registra la fecha de creación y modificación del registro
    }
);

// Exportamos el modelo de la Tabla "User"
module.exports = User;