'use strict';

var request = require('request');
var cheerio = require('cheerio');
var diaryStatusCheck = require('./mfp_functions/diaryStatusCheck.js');
var fetchSingleDate = require('./mfp_functions/fetchSingleDate.js');

module.exports = {
  diaryStatusCheck: diaryStatusCheck,
  fetchSingleDate: fetchSingleDate
};
