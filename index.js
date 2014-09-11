//requirements
var request = require('request');
var cheerio = require('cheerio');
var fetchSingleDate = require('./mfp_functions/fetchSingleDate.js');
var fetchDateRange = require('./mfp_functions/fetchDateRange.js');

//exported mfp functions
module.exports = {
  fetchSingleDate: fetchSingleDate,
  fetchDateRange: fetchDateRange
};
