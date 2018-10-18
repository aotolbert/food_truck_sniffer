require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var twitterWebhook = require("twitter-webhooks");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

console.log(process.env.TWITTER_API_SECRET);

var webhook = twitterWebhook.userActivity({
  serverUrl: "https://foodtrucksniffer.herokuapp.com",
  route: "/webhook/twitter",
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
  environment: process.env.TWITTER_WEBHOOK_ENV
});

webhook.getWebhook().then(function (data) {
  if (!data[0].valid) {
    webhook.register();

    webhook.subscribe({
      userId: process.env.TWITTER_USER_ID,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_SECRET
    });
  }
});

webhook.on("event", function(event, userId, data) {
  var arr = data.text.split("|")[0];
  var address = arr.split(" ").slice(1).join(" ");
  console.log(`
  ${arr}
  --------
  ${address}`);
  console.log(`
------------------
${data.user.screen_name}
${data.user.name} :
${data.text}`);
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
app.use("/", webhook);
// require("./routes/apiRoutes")(app);
// require("./routes/apiRoutes")(app);
require("./routes/yelpreview-api-routes")(app);
require("./routes/trucks-api-routes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/server-side-yelp-api");

// Helper
require("./helper/yelpAPIcall");

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
