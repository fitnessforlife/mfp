'use strict';

var request = require('request');
var cheerio = require('cheerio');
var helpers = require('./helper-utils');

var fetchSingleDate = function(username, date, targetFields, callback){
  //get MyFitnessPal URL (eg. 'http://www.myfitnesspal.com/food/diary/azey47)
  var url = helpers.mfpUrl(username, date);

  request(url, function(error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    //set fields object to store data
    var results = {};

    //define variables for determining columns of fields on MFP page
    var cols = {};

    //find and set column numbers of desired fields
    $('tfoot').find('tr').find('td').each(function(index, element){
      var $element = $(element);
      var fieldName = $element.text().toLowerCase();
      if (fieldName !== '') { cols[fieldName] = index; }
    });

    //find row in MFP with nutrient totals
    var $dataRow = $('tr.total:not(.alt, .remaining)');

    //store data for each field in results
    for (var field in cols) {
      var col = cols[field] + 1; //because nth-child selector is 1-indexed, not 0-indexed
      var mfpData = $dataRow.find('td:nth-child(' + col + ')').text();
      results[field] = helpers.convertToNum(mfpData);
    }

    callback(results);
  });
};

module.exports = fetchSingleDate;
