'use strict';

var cheerio = require('cheerio');
var request = require('request');

var userPassword = process.env.USER_PASSWORD;

var loginJar = request.jar();

var options = {
  url: 'https://www.myfitnesspal.com/account/login',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
  },
  jar: loginJar,
};

function getAuthToken(callback) {

  var reqOptions = Object.assign(
    {},
    options,
    { method: 'GET' }
  );

  request(reqOptions, function (error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    var utf8Value = $('input[name="utf8"]').val();
    var authenticityToken = $('input[name="authenticity_token"]').val();

    // Pass the headers along to the next request, along with the required token values
    callback({ utf8Value: utf8Value, authenticityToken: authenticityToken, headers: response.headers });
  });
}

function login(username) {

  getAuthToken(function (data) {
    var reqOptions = Object.assign(
      {},      // start with a new Obj (clone)
      options, // add our default options
      {        // add our overrides
        method: 'POST',
        form: {
          utf8: data.utf8Value,
          authenticity_token: data.authenticityToken,
          username: username,
          password: userPassword,
        }
      },
      // Finally, preserve our headers
      { headers: data.headers }
    );

    request(reqOptions, function (error, response, body) {
      // console.log(JSON.stringify(response));
      if (error) throw error;

      var $ = cheerio.load(body);

      if ($('p:contains("Incorrect username or password")')) {
        throw new Error("Incorrect username or password");
      } else {
        console.log("Successful login!");
      }
    });
  });
}

module.exports = login;

// Later on:
// var newHeaders = {
//   Authorization: 'Bearer {token}'.format(token = self.access_token),
//   'mfp-client-id': 'mfp-main-js',
//   'mfp-user-id': self.user_id,
// }