'use strict';

const cheerio = require('cheerio');
const superagent = require('superagent');

const INCORRECT_PASSWORD_MESSAGE = 'Incorrect username or password';
const MAXIMUM_ATTEMPT_MESSAGE =
  'You have exceeded the maximum number of consecutive failed login attempts';

class Session {
  constructor() {
    this.agent = superagent.agent();
  }

  login(username, password) {
    const authSession = this.getCRSF()
      .then(() => this.inputPassword(username, password))
      .then(() => this.getToken());

    return authSession;
  }

  getCRSF() {
    return new Promise((resolve, reject) => {
      this.agent
        .get('https://www.myfitnesspal.com/account/login')
        .set(
          'User-Agent',
          'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        )
        .then(res => {
          const $ = cheerio.load(res.text);

          this.utf8Value = $('input[name="utf8"]').val();
          this.authenticityToken = $('input[name="authenticity_token"]').val();
        })
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(this.agent);
        });
    });
  }

  inputPassword(username, password) {
    return new Promise((resolve, reject) => {
      this.agent
        .post('https://www.myfitnesspal.com/account/login')
        .type('form')
        .send({
          utf8: this.utf8Value,
          authenticity_token: this.authenticityToken,
          username: username,
          password: password
        })
        .then(res => {
          var $ = cheerio.load(res.text);

          if ($(`p:contains("${INCORRECT_PASSWORD_MESSAGE}")`).length > 0) {
            reject(INCORRECT_PASSWORD_MESSAGE);
          }

          if ($(`p:contains("${MAXIMUM_ATTEMPT_MESSAGE}")`).length > 0) {
            reject(MAXIMUM_ATTEMPT_MESSAGE);
          }
        })
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(this.agent);
        });
    });
  }

  getToken() {
    return new Promise((resolve, reject) => {
      this.agent
        .get('https://www.myfitnesspal.com/user/auth_token')
        .query({ refresh: true })
        .then(res => {
          if (!res.ok) {
            reject(`Unable to get Auth Token: Status ${res.status}`);
          } else {
            this.authToken = res.body;
            resolve(this.agent);
          }
        });
    });
  }
}

module.exports = Session;

// Later on:
// var newHeaders = {
//   Authorization: 'Bearer {token}'.format(token = self.access_token),
//   'mfp-client-id': 'mfp-main-js',
//   'mfp-user-id': self.user_id,
// }
