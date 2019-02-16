'use strict';

// var request = require('request');
// var fetchSingleDate = require('./mfp_functions/fetchSingleDate');
const Session = require('./mfp_functions/login');

// fetchSingleDate('jetknife', '2019-02-07', ['calories'], function (data) {
//   console.log(data)
// });

const session = new Session();

async function doStuff() {
  try {
    const agent = await session.login('jetknife', process.env.USER_PASSWORD);

    console.log(session.headers);
    // agent.
  } catch (err) {
    console.error(err);
  }
}

doStuff();
