'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var fetchSingleDate = require('../index.js').fetchSingleDate;

describe('fetchSingleDate', function(){
  it('should be a function', function(){
    (typeof fetchSingleDate).should.equal('function');
  });

  it('should contain the correct diary date in the results object', function(){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-singleDate.html');

    var expected = {
      date: '2014-09-13',
      calories: 2078,
      carbs: 98,
      fat: 119,
      protein: 153,
      cholesterol: 1123,
      sodium: 3031,
      sugar: 14,
      fiber: 5
    };

    fetchSingleDate('npmmfp', '2014-09-13', 'all', function(data){
     (data.date).should.equal(expected.date);
    });
  });

  it('should return an object with all available nutrient data', function(){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-singleDate.html');

    var expected = {
      date: '2014-09-13',
      calories: 2078,
      carbs: 98,
      fat: 119,
      protein: 153,
      cholesterol: 1123,
      sodium: 3031,
      sugar: 14,
      fiber: 5
    };

    fetchSingleDate('npmmfp', '2014-09-13', 'all', function(data){
     (data).should.deep.equal(expected);
    });
  });

  it('should return an object with only user specified nutrient data', function(){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-singleDate.html');

    var expected = {
      date: '2014-09-13',
      calories: 2078,
      fat: 119,
      cholesterol: 1123,
      sugar: 14
    };

    fetchSingleDate('npmmfp', '2014-09-13', ['calories', 'fat', 'cholesterol', 'sugar'], function(data){
     (data).should.deep.equal(expected);
    });
  });

  it('should ignore invalid nutrient fields', function(){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-singleDate.html');

    var expected = {
      date: '2014-09-13',
      calories: 2078,
      fat: 119,
      cholesterol: 1123,
      sugar: 14
    };

    fetchSingleDate('npmmfp', '2014-09-13', ['calories', 'fat', 'cholesterol', 'sugar', 'wrongnutrientfield'], function(data){
     (data).should.deep.equal(expected);
    });
  });
});
