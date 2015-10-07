'use strict';

var request = require('request');
var cheerio = require('cheerio');
var helpers = require('./helper-utils');

var diaryStatusCheck = function(username, callback){
  //get MyFitnessPal URL (eg. 'http://www.myfitnesspal.com/reports/printable_diary/npmmfp')
  var url = helpers.mfpUrl(username);

  var options = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
  };

  request(options, function(error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    if (body === 'Invalid username' || body === 'Invalid username\n') {
      callback('invalid user');
    }

    else if ( $('h1').text() === 'Page not found') {
      callback('invalid user');
    }

    else if ( $('#main').find('#settings').find('h1').text() === 'This Diary is Private' ) {
      callback('private');
    }

    else if ( $('#main').find('#settings').find('h1').text() === 'Password Required' ) {
      callback('private');
    }

    else {
      callback('public');
    }
  });
};

module.exports = diaryStatusCheck;
