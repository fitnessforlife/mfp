'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var fetchDateRange = require('../index.js').fetchDateRange;

describe('fetchDateRange', function(){
  it('should be a function', function(){
    (typeof fetchDateRange).should.equal('function');
  });

  it('should return an object with all available nutrient data', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-17")
      .replyWithFile(200, __dirname + '/mocks/diary-5Days.html');

    var expected = {
      username: 'npmmfp',
      data: [
        { date: '2014-09-13',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          cholesterol: 1123,
          sodium: 3031,
          sugar: 14,
          fiber: 5
        },
        { date: '2014-09-14',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          cholesterol: 1123,
          sodium: 3031,
          sugar: 14,
          fiber: 5
        },
        { date: '2014-09-15',
          calories: 1278,
          carbs: 39,
          fat: 71,
          protein: 119,
          cholesterol: 264,
          sodium: 2103,
          sugar: 10,
          fiber: 3
        },
        { date: '2014-09-16',
          calories: 1470,
          carbs: 98,
          fat: 89,
          protein: 71,
          cholesterol: 979,
          sodium: 2368,
          sugar: 14,
          fiber: 5
        },
        { date: '2014-09-17',
          calories: 1013,
          carbs: 5,
          fat: 60,
          protein: 109,
          cholesterol: 1003,
          sodium: 1346,
          sugar: 4,
          fiber: 0
        }
      ]
    };

    fetchDateRange('npmmfp', '2014-09-13', '2014-09-17', 'all', function(data){
      (data).should.deep.equal(expected);
      done();
    });
  });

  it('should return an object with only user specified nutrient data', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-17")
      .replyWithFile(200, __dirname + '/mocks/diary-5Days.html');

    var expected = {
      username: 'npmmfp',
      data: [
        { date: '2014-09-13',
          calories: 2078,
          carbs: 98
        },
        { date: '2014-09-14',
          calories: 2078,
          carbs: 98
        },
        { date: '2014-09-15',
          calories: 1278,
          carbs: 39
        },
        { date: '2014-09-16',
          calories: 1470,
          carbs: 98
        },
        { date: '2014-09-17',
          calories: 1013,
          carbs: 5
        }
      ]
    };

    fetchDateRange('npmmfp', '2014-09-13', '2014-09-17', ['calories', 'carbs'], function(data){
     (data).should.deep.equal(expected);
     done();
    });
  });
});
