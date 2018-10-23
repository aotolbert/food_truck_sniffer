module.exports = function(sequelize, DataTypes) {
  var YelpReview = sequelize.define("YelpReview", {
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    //Why are we including this?//
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "This is content",
      validate: {
        len: [1]
      }
    },
    contentTimeCreated: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contentUrl: {
      type: DataTypes.TEXT
    },
    userImage: {
      type: DataTypes.TEXT
    }
  });

  YelpReview.associate = function(models) {
    // We're saying that a YelpReview should belong to an FoodTruck
    // A YelpReview can't be created without an FoodTruck due to the foreign key constraint
    YelpReview.belongsTo(models.FoodTruck, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return YelpReview;
};
