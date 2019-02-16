'use strict';

var cheerio = require('cheerio');
var superagent = require('superagent');
var agent = superagent.agent();

var INCORRECT_PASSWORD_MESSAGE = 'Incorrect username or password';
var MAXIMUM_ATTEMPT_MESSAGE =
  'You have exceeded the maximum number of consecutive failed login attempts';

var utf8Value;
var authenticityToken;

function login(username, password) {
  return getCRSF(agent)
    .then(function(agent) {
      return inputPassword(agent, username, password);
    })
    .then(function(agent) {
      return getToken(agent);
    });
}

function getCRSF(agent) {
  return new Promise(function(resolve, reject) {
    agent
      .get('https://www.myfitnesspal.com/account/login')
      .set(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
      )
      .then(function(res) {
        var $ = cheerio.load(res.text);

        utf8Value = $('input[name="utf8"]').val();
        authenticityToken = $('input[name="authenticity_token"]').val();
      })
      .catch(function(err) {
        reject(err);
      })
      .then(function() {
        resolve(agent);
      });
  });
}

function inputPassword(agent, username, password) {
  return new Promise(function(resolve, reject) {
    agent
      .post('https://www.myfitnesspal.com/account/login')
      .type('form')
      .send({
        utf8: utf8Value,
        authenticity_token: authenticityToken,
        username: username,
        password: password
      })
      .then(function(res) {
        var $ = cheerio.load(res.text);

        if ($('p:contains("' + INCORRECT_PASSWORD_MESSAGE + '")').length > 0) {
          reject(INCORRECT_PASSWORD_MESSAGE);
        }

        if ($('p:contains("' + MAXIMUM_ATTEMPT_MESSAGE + '")').length > 0) {
          reject(MAXIMUM_ATTEMPT_MESSAGE);
        }
      })
      .catch(function(err) {
        reject(err);
      })
      .then(function() {
        resolve(agent);
      });
  });
}

function getToken(agent) {
  return new Promise(function(resolve, reject) {
    agent
      .get('https://www.myfitnesspal.com/user/auth_token')
      .query({ refresh: true })
      .then(function(res) {
        if (!res.ok) {
          reject('Unable to get Auth Token: Status' + res.status);
        } else {
          console.log(res.body);
          resolve(agent);
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
