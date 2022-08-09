const { DataTypes, ValidationError } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfTG8GQN9AwsCA1unxRIpQHT3dY5hiJMb1g&usqp=CAU",
      validate: {
        isUrl: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        max: 5,
        min: 1,
        // isFloat: true
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};


// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *