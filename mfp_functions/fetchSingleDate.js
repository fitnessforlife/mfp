'use strict';

var request = require('request');
var cheerio = require('cheerio');
var helpers = require('./helper-utils');


//some notes: we use the printable diary for most checks, but not water, which can't be fetched here.
var fetchSingleDate = function(username, date, fields, callback){
  //get MyFitnessPal URL (eg. 'https://www.myfitnesspal.com/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13')
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
      var mfpData = $dataRow.find('td:nth-child(' + col + ')').first().text();
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

    if (fields == 'all' || fields.includes('entries')) {
      // show the actual food items the user ate that day
      results["entries"] = []

      var $foodEntries = $('td[class=first]')
      $foodEntries.each(function(entryIndex, entryElement) {
        if (entryIndex == 0 || entryIndex == $foodEntries.length - 1) {
          // The first and last items are headers that we don't need
          return
        }

        // The code below won't fully work if there is a `, ` in the name
        // of the food. For now, this will do the job though
        var currentEntry = $(entryElement).text().split(", ")
        results["entries"].push({
          "name": currentEntry[0],
          "amount": currentEntry[currentEntry.length - 1]
        })
      })
    }
    
    //check to see if water is included
    if (fields == 'all' || fields.includes('water')) {
      var url = helpers.mfpWaterUrl(username, date);
      var options = {
        url: url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        }
      };
    
      request(options, function(error, response, body) {
        if (error) throw error;
    
        var $ = cheerio.load(body);
        results['water'] = helpers.convertToNum($('.water-counter p').text());
        callback(results);
      });
    } else {
      callback(results);
    }
  });
};

module.exports = fetchSingleDate;
