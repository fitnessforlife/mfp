'use strict';

var should = require('chai').should();
var diaryStatusCheck = require('./diaryStatusCheck');
var fetchSingleDate = require('./fetchSingleDate');

//this function checks to see if MyFitnessPal has changed the structure of their data presentation
//by checking to see if running 'fetchSingleDate' returns the expected data values for a known page
//Test Page: http://www.myfitnesspal.com/food/diary/npmmfp?date=2014-09-13
//Expected Values:
//  Calories: 2078
//  Carbs: 98
//  Fat: 119
//  Protein: 153
//	Sodium: 3031
//	Sugar: 14

//check to see if diaryStatusCheck is working correctly (
  //branch 1: public
  //branch 2: private
  //branch 3: invalid user

//check to see if fetchSingleDate is working correctly
  //all fields
  //single fields

var apiStatusCheck = function(callback){
  var errors = [];
  var remainingChecks = 5;


  //Check 1
  diaryStatusCheck('npmmfp', function(status) {
    if (status !== 'public') {
      errors.push("diaryStatusCheck isn't working correctly for public profiles");
    }
    remainingChecks--;
    if (!remainingChecks){
      callback(errors);
    }
  });

  //Check 2
  diaryStatusCheck('npmmfpprivate', function(status) {
    if (status !== 'private') {
      errors.push("diaryStatusCheck isn't working correctly for private profiles");
    }
    remainingChecks--;
    if (!remainingChecks){
      callback(errors);
    }
  });

  //Check 3
  diaryStatusCheck('asdfkjb3@#*ASasdf', function(status) {
    if (status !== 'invalid user') {
      errors.push("diaryStatusCheck isn't working correctly for invalid usernames");
    }
    remainingChecks--;
    if (!remainingChecks){
      callback(errors);
    }
  });

  //Check 4
  fetchSingleDate('npmmfp', '2014-09-13', 'all', function(data){
    var expected = {
      date: '2014-09-13',
      calories: 2078,
      carbs: 98,
      fat: 119,
      protein: 153,
      sodium: 3031,
      sugar: 14
    };

    if (data.calories !== 2078 || data.carbs !== 98 || data.sugar !== 14){
      errors.push("fetchSingleDate with all nutrients isn't working correctly");
    }
    remainingChecks--;
    if (!remainingChecks){
      callback(errors);
    }
  });

  //Check 5
  fetchSingleDate('npmmfp', '2014-09-13', ['calories', 'fat'], function(data){
    var expected = {
      date: '2014-09-13',
      calories: 2078,
      fat: 119
    };

    if (data.calories !== 2078 || data.fat !== 119 || data.date !== '2014-09-13'){
      errors.push("fetchSingleDate with user-specified nutrients isn't working correctly");
    }
    remainingChecks--;
    if (!remainingChecks){
      callback(errors);
    }
  });
};

module.exports = apiStatusCheck;
