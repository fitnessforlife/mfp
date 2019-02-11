"use strict";

var cheerio = require("cheerio");
var superagent = require("superagent");
var agent = superagent.agent();

var password = process.env.USER_PASSWORD;

function login(username) {
  var utf8Value;
  var authenticityToken;

  agent
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

          if ($('p:contains("Incorrect username or password")')) {
            throw new Error("Incorrect username or password");
          } else {
            console.log("Successful login!");
          }
        })
        .catch(function(err) {
          throw err;
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
