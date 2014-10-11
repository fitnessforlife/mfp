'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var fetchDateRange = require('../mfp_functions/fetchDateRange.js');

describe('fetchDateRange', function(){
  it('should be a function', function(){
    (typeof fetchDateRange).should.equal('function');
  });

  it('should return an object with all available nutrient data', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-15")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-16")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-17")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    var expected = {
      username: 'npmmfp',
      data: [
        { date: '2014-09-13',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          sodium: 3031,
          sugar: 14,
        },
        { date: '2014-09-14',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          sodium: 3031,
          sugar: 14,
        },
        { date: '2014-09-15',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          sodium: 3031,
          sugar: 14,
        },
        { date: '2014-09-16',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          sodium: 3031,
          sugar: 14,
        },
        { date: '2014-09-17',
          calories: 2078,
          carbs: 98,
          fat: 119,
          protein: 153,
          sodium: 3031,
          sugar: 14,
        }
      ]
    };

    fetchDateRange('npmmfp', '2014-09-13', '2014-09-17', 'all', function(data){
      (data).should.deep.equal(expected);
    });
  });

  it('should return an object with only user specified nutrient data', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp?date=2014-10-05")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-10-06")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-10-07")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-10-08")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-10-09")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    var expected = {
      username: 'npmmfp',
      data: [
        { date: '2014-10-05',
          calories: 2078,
          fat: 119
        },
        { date: '2014-10-06',
          calories: 2078,
          fat: 119
        },
        { date: '2014-10-07',
          calories: 2078,
          fat: 119
        },
        { date: '2014-10-08',
          calories: 2078,
          fat: 119
        },
        { date: '2014-10-09',
          calories: 2078,
          fat: 119
        }
      ]
    };

    fetchDateRange('npmmfp', '2014-10-05', '2014-10-09', ['calories', 'fat'], function(data){
     (data).should.deep.equal(expected);
    });
  });
});
