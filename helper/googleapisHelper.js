'use strict';

const {google} = require('googleapis');
// const path = require('path');
// var google = require('googleapis');
var fusiontables = google.fusiontables('v2');

function googleSQLquery(sqlStatement) {
var jwtClient = new google.auth.JWT(
  process.env.GOOGLEAPIS_EMAIL, // I store my stuff in an .env file so it's not in the file
  './MYNEWFILE.pem', //wherever you can access this file
  null,
  ['https://www.googleapis.com/auth/fusiontables', 'https://www.googleapis.com/auth/fusiontables.readonly'] //scope
);
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    const res = fusiontables.query.sql({auth: jwtClient, sql: sqlStatement });
  }
})}

module.exports = googleSQLquery;
