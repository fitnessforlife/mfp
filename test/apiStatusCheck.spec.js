'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var apiStatusCheck = require('../index.js').apiStatusCheck;

describe('apiStatusCheck', function(){
  it('should be a function', function(){
    (typeof apiStatusCheck).should.equal('function');
  });

  it("should pass an array with an error message when npmmfp's diary is not 'public'", function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html') //wrong one
      .get("/reports/printable_diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/reports/printable_diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-14&to=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("diaryStatusCheck isn't working correctly for public profiles");
      done();
    });
  });

  it("should pass an array with an error message when npmmfpprivate's diary is not 'private'", function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html') //wrong one
      .get("/reports/printable_diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-14&to=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("diaryStatusCheck isn't working correctly for private profiles");
      done();
    });
  });

  it("should pass an array with an error message when invalid diaries are handled incorrectly", function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/reports/printable_diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html') //wrong data
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-14&to=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("diaryStatusCheck isn't working correctly for invalid usernames");
      done();
    });
  });

  it("should pass an array with an error message when fetching all nutrient data from a date doesn't work", function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/reports/printable_diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html') //wrong data
      .get("/reports/printable_diary/npmmfp?from=2014-09-14&to=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    apiStatusCheck(function(errors){
      (errors[0]).should.equal("fetchSingleDate with all nutrients isn't working correctly");
      done();
    });
  });

  it("should pass an array with multiple error messages when encountering multiple broken functions", function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/reports/printable_diary/npmmfpprivate")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html')
      .get("/reports/printable_diary/asdfkjb3Abfdalk")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-13&to=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html')
      .get("/reports/printable_diary/npmmfp?from=2014-09-14&to=2014-09-14")
      .replyWithFile(200, __dirname + '/mocks/diary-public-wrong-data.html'); //wrong data

    apiStatusCheck(function(errors){
      (errors).should.include("diaryStatusCheck isn't working correctly for public profiles");
      (errors).should.include("fetchSingleDate with user-specified nutrients isn't working correctly");
      done();
    });
  });

});
