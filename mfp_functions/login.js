"use strict";

var cheerio = require("cheerio");
var superagent = require("superagent");
var agent = superagent.agent();

var INCORRECT_PASSWORD_MESSAGE = "Incorrect username or password";
var MAXIMUM_ATTEMPT_MESSAGE =
  "You have exceeded the maximum number of consecutive failed login attempts";

function login(username, password) {
  var utf8Value;
  var authenticityToken;

  return agent
    .get("https://www.myfitnesspal.com/account/login")
    .set(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
    )
    .then(function(res) {
      var $ = cheerio.load(res.text);

      utf8Value = $('input[name="utf8"]').val();
      authenticityToken = $('input[name="authenticity_token"]').val();
    })
    .catch(function(err) {
      throw err;
    })
    .then(function() {
      return agent
        .post("https://www.myfitnesspal.com/account/login")
        .type("form")
        .send({
          utf8: utf8Value,
          authenticity_token: authenticityToken,
          username: username,
          password: password
        })
        .then(function(res) {
          var $ = cheerio.load(res.text);

          if (
            $('p:contains("' + INCORRECT_PASSWORD_MESSAGE + '")').length > 0
          ) {
            throw new Error(INCORRECT_PASSWORD_MESSAGE);
          }

          if ($('p:contains("' + MAXIMUM_ATTEMPT_MESSAGE + '")').length > 0) {
            throw new Error(MAXIMUM_ATTEMPT_MESSAGE);
          }
        })
        .catch(function(err) {
          throw err;
        })
        .then(function() {
          return agent
            .get("https://www.myfitnesspal.com/user/auth_token")
            .query({ refresh: true })
            .then(function(res) {
              if (!res.ok) {
                throw new Error(
                  "Unable to get Auth Token: Status " + res.status
                );
              } else {
                return res.body;
              }
            });
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
