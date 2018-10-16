var db = require("../models");

module.exports = function(app) {
  // Get all FoodTrucks
  app.get("/api/trucks", function(req, res) {
    db.FoodTruck.findAll({}).then(function(dbFoodTrucks) {
      res.json(dbFoodTrucks);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
