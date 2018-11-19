var fetch = require("fetch").fetchUrl;
var db = require("../models");
let truckOBJs = []
let sqlStatments = ""

// setTimeout(prepareGoogleinsertCall, 30 * 1000)

function prepareGoogleinsertCall() {
    console.log("prepareGoogleinsert ran")
    db.FoodTruck.findAll({}).then(function (results) {
        for (let g = 0; g < results.length; g++) {
            truckOBJs.push(results[g]);
        }
    }).then(function (results) {
        for (let a = 0; a < truckOBJs.length; a++) {
            let TwitterId = truckOBJs[a].twitterId;
            let Name = truckOBJs[a].name;
            let Phone = truckOBJs[a].phone;
            let url = truckOBJs[a].url;
            let Address = truckOBJs[a].address;
            let overallRating = truckOBJs[a].overallRating;
            let image = truckOBJs[a].image;
            let priceRating = truckOBJs[a].priceRating;
            let YelpReviews = truckOBJs[a].YelpReviews;
            sqlStatments = sqlStatments + `INSERT INTO 1vJIoCXgQIU8nFSnQ3pfyw_kWhgnIdh8GmCRe-2If (TwitterId, Name, Phone, url, Address, overallRating, image, priceRating, YelpReviews) VALUES ("${TwitterId}","${Name}", "${Phone}", "${url}", "${Address}", "${overallRating}", "${image}", "${priceRating}", "${YelpReviews}");`
        }
    }).then(function () {
        console.log("This is the sqlStatments: ", sqlStatments)
        googleApiCall("POST", sqlStatments).then(console.log);
    })
}

function googleApiCall(method, body) {
    return new Promise((resolve, reject) => {
        fetch(`https://www.googleapis.com/fusiontables/v2/querysql=${body}&key=AIzaSyCqVSdnRqX7ARJawUR_LXPnuV7-a9Yk-u0`, {
            method: method,
        }, function (error, meta, body) {
            console.log(error, meta, body)
        })
    })
};
