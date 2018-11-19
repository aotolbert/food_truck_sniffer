'use strict';

const {google} = require('googleapis');
const path = require('path');

/**
 * The JWT authorization is ideal for performing server-to-server
 * communication without asking for user consent.
 *
 * Suggested reading for Admin SDK users using service accounts:
 * https://developers.google.com/admin-sdk/directory/v1/guides/delegation
 *
 * See the defaultauth.js sample for an alternate way of fetching compute credentials.
 */
async function googleSQLquery(query) {
  
  // Create a new JWT client using the key file downloaded from the Google Developer Console
  const client = await google.auth.getClient({
    keyFile: path.join(__dirname, 'jwt.keys.json'),
    scopes: ['https://www.googleapis.com/auth/fusiontables','https://www.googleapis.com/auth/fusiontables.readonly'],
  });

  // Obtain a new fusiontables client, making sure you pass along the auth client
  const fusiontables = google.fusiontables({
    version: 'v2',
    auth: client,
  });

  // Make an authorized request to Fusion Tables API.
  const res = await fusiontables.query.sql({sql:query});
  console.log(res.data);

  return res.data;
}

googleSQLquery("INSERT INTO 1vJIoCXgQIU8nFSnQ3pfyw_kWhgnIdh8GmCRe-2If (TwitterId, Name, Phone, url, Address, overallRating, image, priceRating, YelpReviews) VALUES ('@HiyaFoodTruck','Hiya Food Truck', '(240) 670-4492', 'http://www.hiyafoodtruck.com/', '620 W Morehead St', '4', 'https://s3-media1.fl.yelpcdn.com/bphoto/CdXnN6QmOSTfaw0UsQZ04w/o.jpg', '$', 'undefined')")
.catch(console.error);


module.exports = {googleSQLquery};