const db = require("../models");

module.exports = app => {

  app.get("/", (req, res) => {
    db.FoodTruck.findAll({ include: [db.YelpReview] }).then(dbFoodtruck => {
      console.log("dbFoodTruck" + dbFoodtruck);
      res.render("index", {
        msg: "This is empty Space! Handlebar message",
        FoodTruck: dbFoodtruck
      });
    });
  });
  app.get("/admin", (req, res) => {
    res.render("admin", {
      msg: "Admin Page"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
