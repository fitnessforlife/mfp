'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var apiStatusCheck = require('../index.js').apiStatusCheck;

describe('apiStatusCheck', function(){
  it('should be a function', function(){
    (typeof apiStatusCheck).should.equal('function');
  });

  it("should pass an array with an error message when npmmfp's diary is not 'public'", function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("diaryStatusCheck isn't working correctly for public profiles");
    });
  });

  it("should pass an array with an error message when npmmfpprivate's diary is not 'private'", function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("diaryStatusCheck isn't working correctly for private profiles");
    });
  });

  it("should pass an array with an error message when invalid diaries are handled differently", function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("diaryStatusCheck isn't working correctly for invalid usernames");
    });
  });

  it("should pass an array with an error message when fetching all nutrient data from a date doesn't work", function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html')
      .get("/food/diary/npmmfp?date=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("fetchSingleDate with all nutrients isn't working correctly");
    });
  });

  it("should pass an array with an error message when fetching user-specified nutrient data from a date doesn't work", function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("fetchSingleDate with user-specified nutrients isn't working correctly");
    });
  });

  it("should pass an array with multiple error messages when encountering multiple broken functions", function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/food/diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/food/diary/npmmfp?date=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html');

    apiStatusCheck(function(errors){
      (errors).should.include("diaryStatusCheck isn't working correctly for public profiles");
      (errors).should.include("fetchSingleDate with user-specified nutrients isn't working correctly");
    });
  });

});
