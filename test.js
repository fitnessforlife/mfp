'use strict';

// var request = require('request');
// var fetchSingleDate = require('./mfp_functions/fetchSingleDate');
var login = require('./mfp_functions/login');

// fetchSingleDate('jetknife', '2019-02-07', ['calories'], function (data) {
//   console.log(data)
// });

(async function doStuff() {
  try {
    const agent = await login('jetknife', process.env.USER_PASSWORD);
    // agent.
  } catch (err) {
    console.error(err);
  }
})();
