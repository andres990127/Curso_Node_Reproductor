// Archivo para configurar el esquema de la tabla de tracks

// Importamos sequelize para definir el modelo
const { sequelize } = require('../../config/mySql');

// Importamos los tipos de datos para definirselos a los atributos del modelo
const { DataTypes } = require('sequelize');

// Definimos el esquema para la tabla de usuarios
const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_mickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true, // Registra la fecha de creación y modificación del registro
  }
);

// Exportamos el modelo de la Tabla "Tracks"
module.exports = Tracks;