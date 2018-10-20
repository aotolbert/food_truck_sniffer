var yelpApi = require("../helper/yelpAPIcall");
var db = require("../models");
var truckNamesFromDatabase = [];

// call to the database to receive the names of the food trucks stored
db.FoodTruck.findAll({
  attributes: ["name"]
}).then(function(results) {
  for (var g = 0; g < results.length; g++) {
    truckNamesFromDatabase.push(results[g].dataValues.name);
  }
});

// setInterval to make API call to yelp once per day, updating the info for each food truck

var yelpApiTimer = setInterval(function() {
  runApiArray(truckNamesFromDatabase);
}, 60 * 1000); // run yelp API every 12 hours  insert  ( 12 * 60 * 60 * 1000 )

// server-side API call to yelp
function runApiArray(truckArray) {
  for (let i = 0; i < truckArray.length; i++) {
    yelpApi(truckArray[i]).then(function (response) {
        let FoodTruckId;
        let Response = response;
        console.log(response);
        db.FoodTruck.findAll({ where: { yelpId: Response.yelpID } }).then(function (dbFoodTruck) {
            console.log(dbFoodTruck.id);
            FoodTruckId = dbFoodTruck.id
            db.YelpReview.destroy({
                where: {
                    FoodTruckId: FoodTruckId
                }
            }).then(function (dbFoodTruck) {
                console.log(dbFoodTruck);
                for (let b = 0; b < Response.reviewText.length; b++) {
                    db.YelpReview.create({
                        rating: Response.reviewRating[b],
                        username: Response.reviewAuthor[b],
                        content: Response.reviewText[b],
                        contentTimeCreated: Response.reviewTime[b],
                        FoodTruckId: FoodTruckId
                    })
                }
                db.FoodTruck.update({
                    phone: Response.phone,
                    overallRating: Response.rating,
                    image: Response.image_url,
                    priceRating: Response.price,
                }, {
                        where: {
                            id: FoodTruckId
                        }
                    })
            }).then(function (result) {
                console.log("saved to database");
                console.log(result);
            });
        });
    })
}};
