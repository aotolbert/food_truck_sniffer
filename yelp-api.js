var db = require("../models");
var fetchUrl = require("fetch").fetchUrl;


module.exports = function (app) {
    // this array will be created by getting the truck names from our database.
    var trucksArray = ["Two Chicks and a Truck", "TIN Kitchen", "What The Fries"];
    // var truckName = "Two Chicks and a Truck";

    // yelper calls the setInterval 
    var yelper = setInterval(function () {
        callYelp(trucksArray)
    }, 3 * 1000);


    function callYelp(inputArray) {

        // yelp api key
        var options = {
            headers: {
                "authorization": "Bearer o9xNuv18aSk-fu_WL-8YoXbq9oiB-E24VVSuR1Nw4T4WND_fd1teCzTbfzT42mOqLIny_F7eiWazQwJViIQau6liQDy2FxuabwEogcATxcpEI3Sf4wgSrjrSkVDCW3Yx"
            }
        }

        for (var k = 0; k < inputArray.length; k++) {
        // yelp api call
            fetchUrl(`https://api.yelp.com/v3/businesses/search?term=${inputArray[k]}&location=charlotte_nc`, options, function (error, meta, body) {
                var obj = JSON.parse(body);
                var result = obj.businesses[0];
                var id = result.id; // used to get the reviews from the yelp api endpoint below
                var company = result.name;
                var foodPicture = result.image_url;
                var category = result.categories[0].title;
                var overallRating = result.rating;
                var price = result.price;
                var phone = result.display_phone;

                fetchUrl(`https://api.yelp.com/v3/businesses/${id}/reviews`, options, function (error, meta, body) {
                    var obj = JSON.parse(body);

                    var review_1_text = obj.reviews[0].text;
                    var review_1_rating = obj.reviews[0].rating;
                    var review_1_time = obj.reviews[0].time_created;
                    var review_1_author = obj.reviews[0].user.name;

                    var review_2_text = obj.reviews[1].text;
                    var review_2_rating = obj.reviews[1].rating;
                    var review_2_time = obj.reviews[1].time_created;
                    var review_2_author = obj.reviews[1].user.name;

                    var review_3_text = obj.reviews[2].text;
                    var review_3_rating = obj.reviews[2].rating;
                    var review_3_time = obj.reviews[2].time_created;
                    var review_3_author = obj.reviews[2].user.name;


                    console.log(`
    
            yelpID: ${id},
            company name: ${company},
            food pic: ${foodPicture},
            category: ${category},
            overall rating: ${overallRating},
            price: ${price},
            phone: ${phone},
    
            REVIEW NUMBER 1.
                REVIEW: ${review_1_text}
                RATING BY USER: ${review_1_rating}
                TIME: ${review_1_time}
                USER INFO: ${review_1_author}
    
            REVIEW NUMBER 2.
                REVIEW: ${review_2_text}
                RATING BY USER: ${review_2_rating}
                TIME: ${review_2_time}
                USER INFO: ${review_2_author}
    
            REVIEW NUMBER 3.
                REVIEW: ${review_3_text}
                RATING BY USER: ${review_3_rating}
                TIME: ${review_3_time}
                USER INFO: ${review_3_author}
    
          `)

        //====== put the api result from truck info into database ======
                    db.Yelps.create({
                        yelpID: id,
                        name: company,
                        image_url: foodPicture,
                        category: category,
                        rating: overallRating,
                        price: price,
                        phone: phone,

                        review_1_text: review_1_text,
                        review_1_rating: review_1_rating,
                        review_1_time: review_1_time,
                        review_1_author: review_1_author,

                        review_2_text: review_2_text,
                        review_2_rating: review_2_rating,
                        review_2_time: review_2_time,
                        review_2_author: review_2_author,

                        review_3_text: review_3_text,
                        review_3_rating: review_3_rating,
                        review_3_time: review_3_time,
                        review_3_author: review_3_author,
                    }).then(function (result) {
                        console.log("saved to database")
                    });
                });
            });
        }
    }
};


