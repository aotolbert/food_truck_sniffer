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
}, 90 * 1000); // run yelp API every 12 hours  insert  ( 12 * 60 * 60 * 1000 )

// server-side API call to yelp
function runApiArray(truckArray) {
  for (var i = 0; i < truckArray.length; i++) {
    yelpApi(truckArray[i]).then(function(response) {
      console.log(response);

      db.YelpReview.create({
        rating: response.rating,
        // username: response.yelpID,
        RestYelpId: response.yelpID,
        RestName: response.name,
        imageUrl: response.image_url,
        category: response.category,
        price: response.price,
        phone: response.phone,

        review1Text: response.review_1_text,
        review1Rating: response.review_1_rating,
        review1Time: response.review_1_time,
        review1Author: response.review_1_author,

        review2Text: response.review_2_text,
        review2Rating: response.review_2_rating,
        review2Time: response.review_2_time,
        review2Author: response.review_2_author,

        review3Text: response.review_3_text,
        review3Rating: response.review_3_rating,
        review3Time: response.review_3_time,
        review3Author: response.review_3_author,
        FoodTruckId: i
      }).then(function(result) {
        console.log("saved to database");
      });
    });
  }
}
