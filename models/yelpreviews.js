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
    RestYelpId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RestName: {
      type: DataTypes.STRING,
      allownull: false
    },
    //What is this for?//
    profileUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "This is content",
      validate: {
        len: [1]
      }
    },
    //What are these two for??//
    contentURL: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    contentTimeCreated: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review1Text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review1Rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    review1Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    review1Author: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    review2Text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review2Rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    review2Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    review2Author: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    review3Text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review3Rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    review3Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    review3Author: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FoodTruckId: {
      type: DataTypes.INTEGER,
      allowNull: true
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
