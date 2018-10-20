module.exports = function(sequelize, DataTypes) {
  var FoodTruck = sequelize.define("FoodTruck", {
    // From Admin input
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // From Admin input
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
      //We will have to set a default address to prevent issues with the map markers
    },
    // From Twitter
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
      //We can set a default thumbnail
      validate: {
        isUrl: true
      }
    },
    // From Yelp
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      //We can set a default thumbnail
      validate: {
        isUrl: true
      }
    },
    // From Admin input
    twitterId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yelpId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //From Yelp
    priceRating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    //From twitter
    addressUpdated: {
      type: DataTypes.DATE,
      allowNull: true
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
