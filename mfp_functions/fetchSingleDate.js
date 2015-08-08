'use strict';

var request = require('request');
var cheerio = require('cheerio');
var helpers = require('./helper-utils');

var fetchSingleDate = function(username, date, fields, callback){
  //get MyFitnessPal URL (eg. 'http://www.myfitnesspal.com/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13')
  var url = helpers.mfpUrl(username, date, date);

  var options = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
  };

  request(options, function(error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    //set results object to store data
    var results = {};

    //define variable for determining columns of fields on MFP page
    var cols = {};

    //find and set column numbers of nutrient fields
    $('#food').find('thead').find('tr').find('td').each(function(index, element){
      var $element = $(element);
      var fieldName = $element.text().toLowerCase();
      if (fieldName === "sugars") { fieldName = "sugar"; } // fixes MFP nutrient field name inconsistency
      if (fieldName === "cholest") { fieldName = "cholesterol"; } // fixes MFP nutrient field name inconsistency
      if (index !== 0) { cols[fieldName] = index; } //ignore first field, which just says "Foods"
    });

    //find row in MFP with nutrient totals
    var $dataRow = $('tfoot').find('tr');

    //store data for each field in results
    for (var field in cols) {
      var col = cols[field] + 1; //because nth-child selector is 1-indexed, not 0-indexed
      var mfpData = $dataRow.find('td:nth-child(' + col + ')').text();
      results[field] = helpers.convertToNum(mfpData);
    }

    if (fields !== 'all' && Array.isArray(fields)) {
      //create targetFields object to hash user-specified nutrient fields
      var targetFields = {};
      fields.forEach(function(field){
        targetFields[field] = true;
      });

      for (var nutrient in results) {
        if (targetFields[nutrient] === undefined) {
          delete results[nutrient];
        }
      }
    }

    //add date to results object
    results.date = date;

    callback(results);
  });
};

module.exports = fetchSingleDate;
