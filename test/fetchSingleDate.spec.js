'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var fetchSingleDate = require('../mfp_functions/fetchSingleDate.js');

describe('fetchSingleDate', function(){
  it('should be a function', function(){
    (typeof fetchSingleDate).should.equal('function');
  });

  it('should return an object with correct nutrient data', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp?date=2014-09-13")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    var expected = {
      calories: 2078,
      carbs: 98,
      fat: 119,
      protein: 153,
      sodium: 3031,
      sugar: 14
    };

    fetchSingleDate('npmmfp', '2014-09-13', 'all', function(data){
     (data).should.deep.equal(expected);
    });
  });
  //
  // it('should pass a "private" string to a callback when accessing a private diary', function(){
  //   nock("http://www.myfitnesspal.com")
  //     .get("/food/diary/npmmfp")
  //     .replyWithFile(200, __dirname + '/mocks/diary-private.html');
  //
  //   diaryStatusCheck('npmmfp', function(status){
  //     (status).should.equal('private');
  //   });
  // });
  //
  // it('should pass a "private" string to a callback when accessing a password-protected diary', function(){
  //   nock("http://www.myfitnesspal.com")
  //     .get("/food/diary/npmmfp")
  //     .replyWithFile(200, __dirname + '/mocks/diary-password.html');
  //
  //   diaryStatusCheck('npmmfp', function(status){
  //     (status).should.equal('private');
  //   });
  // });
  //
  // it('should pass an "invalid user" string to a callback when accessing a diary that doesn\'t exist', function(){
  //   nock("http://www.myfitnesspal.com")
  //     .get("/food/diary/asldfjkb3498a")
  //     .replyWithFile(200, __dirname + '/mocks/diary-invalid.html');
  //
  //   diaryStatusCheck('asldfjkb3498a', function(status){
  //     (status).should.equal('invalid user');
  //   });
  // });
});
