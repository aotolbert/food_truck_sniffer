module.exports = function(sequelize, DataTypes) {
  var FoodTruck = sequelize.define("FoodTruck", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      default: false,
      },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    twitter: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        contains: '@',
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        isDecimal: true,
      }
    },
    long: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        isDecimal: true,
      }
    },
  
  });
  return FoodTruck;
};
