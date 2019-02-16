"use strict";

// var request = require('request');
// var fetchSingleDate = require('./mfp_functions/fetchSingleDate');
var login = require("./mfp_functions/login");

// fetchSingleDate('jetknife', '2019-02-07', ['calories'], function (data) {
//   console.log(data)
// });

try {
  login("jetknife", process.env.USER_PASSWORD).then(function(res) {
    console.log("returned from login function:");
    console.log(res);
  });
} catch (err) {
  console.error(err);
}
