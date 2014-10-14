'use strict';

var request = require('request');
var cheerio = require('cheerio');
var diaryStatusCheck = require('./mfp_functions/diaryStatusCheck.js');
var fetchSingleDate = require('./mfp_functions/fetchSingleDate.js');
var fetchDateRange = require('./mfp_functions/fetchDateRange.js');
var apiStatusCheck = require('./mfp_functions/apiStatusCheck.js');

module.exports = {
  diaryStatusCheck: diaryStatusCheck,
  fetchSingleDate: fetchSingleDate,
  fetchDateRange: fetchDateRange,
  apiStatusCheck: apiStatusCheck
};
