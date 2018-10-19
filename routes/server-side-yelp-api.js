var yelpApi = require("../helper/yelpAPIcall");
var db = require("../models");
var truckNamesFromDatabase = [];

// call to the database to receive the names of the food trucks stored
db.FoodTruck.findAll({
    attributes: ['name']

}).then(function (results) {
    for (var g = 0; g < results.length; g++) {
        truckNamesFromDatabase.push(results[g].dataValues.name)
    }
});


// setInterval to make API call to yelp once per day, updating the info for each food truck

var yelpApiTimer = setInterval(function () {
    runApiArray(truckNamesFromDatabase);
}, 3 * 1000); // run yelp API every 12 hours  insert  ( 12 * 60 * 60 * 1000 )


// server-side API call to yelp
function runApiArray(truckArray) {

    for (var i = 0; i < truckArray.length; i++) {

        yelpApi(truckArray[i]).then(function (response) {
            console.log(response);

            db.YelpReview.create({
                yelpID: response.yelpID,
                name: response.name,
                image_url: response.image_url,
                category: response.category,
                rating: response.rating,
                price: response.price,
                phone: response.phone,

                review_1_text: response.review_1_text,
                review_1_rating: response.review_1_rating,
                review_1_time: response.review_1_time,
                review_1_author: response.review_1_author,

                review_2_text: response.review_2_text,
                review_2_rating: response.review_2_rating,
                review_2_time: response.review_2_time,
                review_2_author: response.review_2_author,

                review_3_text: response.review_3_text,
                review_3_rating: response.review_3_rating,
                review_3_time: response.review_3_time,
                review_3_author: response.review_3_author,
            }).then(function (result) {
                console.log("saved to database")
            });

        });

    }
};