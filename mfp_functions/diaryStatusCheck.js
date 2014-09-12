'use strict';

var request = require('request');
var cheerio = require('cheerio');
var helpers = require('./helper-utils');

var diaryStatusCheck = function(username, callback){
  //get MyFitnessPal URL (eg. 'http://www.myfitnesspal.com/food/diary/azey47)
  var url = helpers.mfpUrl(username);

  request(url, function(error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    if (body === 'Invalid username' || body === 'Invalid username\n') {
      callback('invalid user');
    }

    else if ( $('#main').find('#settings').find('h1').text() === 'This Food Diary is Private' ) {
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
