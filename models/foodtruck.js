module.exports = function(sequelize, DataTypes) {
  var FoodTruck = sequelize.define("FoodTruck", {
    // From Twitter
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      default: false
    },
    // From Yelp
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    // From Twitter
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // From Twitter
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    // From Yelp
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    // From Twitter
    twitterId: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        contains: "@"
      }
    }
  });
  FoodTruck.associate = function(models) {
    // Associating FoodTruck with YelpReviews
    // When an FoodTruck is deleted, also delete any associated YelpReviews
    FoodTruck.hasMany(models.YelpReview, {
      onDelete: "cascade"
    });
  };
  return FoodTruck;
};