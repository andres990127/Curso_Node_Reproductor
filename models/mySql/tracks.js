// Archivo para configurar el esquema de la tabla de tracks

// Importamos sequelize para definir el modelo
const { sequelize } = require('../../config/mySql');

// Importamos los tipos de datos para definirselos a los atributos del modelo
const { DataTypes } = require('sequelize');

// Importamos el modelo de 'Storage' con objetivos de relación entre entidades
const Storage = require('./storage');

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
    artist_nickname: {
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

// Se implementa metodo propio 'findAllData' con relación a Storage, esto permite que cambie el campo "mediaId" de los registros que traiga el track 
// por el registro equivalente con ese ID en storage
Tracks.findAllData = function() {
  Tracks.belongsTo(Storage,{
    foreignKey: 'mediaId', // Relación entre canciones y almacenamiento
    as: 'audio' // Alias
  }); 

  // Buscamos todos los datos pero se cambia el campo "mediaId" por su registro correspondiente en Storage
  return Tracks.findAll({include: 'audio'}); 
};

// Se implementa metodo propio 'findOneData' con relación a Storage, esto permite que cambie el campo "mediaId" de los registros que traiga el track 
// por el registro equivalente con ese ID en storage
Tracks.findOneData = function(id) {
  Tracks.belongsTo(Storage,{
    foreignKey: 'mediaId', // Relación entre canciones y almacenamiento
    as: 'audio' // Alias
  }); 

  // Buscamos el dato que venga con el id entrante y se cambia el campo "mediaId" por su registro correspondiente en Storage
  return Tracks.findOne({
    where: { id: id },
    include: 'audio'
  }); 
};

// Exportamos el modelo de la Tabla "Tracks"
module.exports = Tracks;