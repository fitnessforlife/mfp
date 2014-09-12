'use strict';

var request = require('request');
var cheerio = require('cheerio');
var diaryStatusCheck = require('./mfp_functions/diaryStatusCheck.js');

module.exports = {
  diaryStatusCheck: diaryStatusCheck
};
