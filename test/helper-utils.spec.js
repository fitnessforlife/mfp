'use strict';
/*jshint -W083 */ //suppresses "Do not make functions within a loop warning"

var should = require('chai').should();

var convertToNum = require('../mfp_functions/helper-utils.js').convertToNum;
var mfpUrl = require('../mfp_functions/helper-utils.js').mfpUrl;

var nonStringTypes = [true, [], {}, null, undefined, 1234];

describe('convertToNum', function(){
  it('should be a function', function(){
    (typeof convertToNum).should.equal('function');
  });

  it('should convert strings of numbers to numbers', function(){
    (convertToNum('5600')).should.equal(5600);
  });

  it('should convert strings of numbers with commas to numbers', function(){
    (convertToNum('5,600')).should.equal(5600);
    (convertToNum('1,000,000')).should.equal(1000000);
  });

  it('should throw an error for non-string inputs', function(){
    for (var i = 0; i < nonStringTypes.length; i++) {
      (function(){ convertToNum( nonStringTypes[i] ); }).should.throw(TypeError, "Input type must be 'string'");
    }
  });

  it('should throw an error if input string contains anything other than numbers and commas', function(){
    (function(){ convertToNum('abcd'); }).should.throw(Error, 'Input string must only contain numbers and commas');
    (function(){ convertToNum('1,234abcd'); }).should.throw(Error, 'Input string must only contain numbers and commas');
  });

});

describe('mfpUrl', function(){
  it('should be a function', function(){
    (typeof mfpUrl).should.equal('function');
  });

  it('should construct a proper url when given a username and date', function(){
    (mfpUrl('azey47', '2014-07-08')).should.equal('http://www.myfitnesspal.com/food/diary/azey47?date=2014-07-08');
  });

  it('should throw an error for non-string username inputs', function(){
    for (var i = 0; i < nonStringTypes.length; i++) {
      (function(){ mfpUrl( nonStringTypes[i], '2014-07-08' ); }).should.throw(TypeError, "User ID must be 'string'");
    }
  });

  it('should throw an error for non-string date inputs', function(){
    for (var i = 0; i < nonStringTypes.length; i++) {
      (function(){ mfpUrl( 'username', nonStringTypes[i] ); }).should.throw(TypeError, "Date must be 'string'");
    }
  });

  it('should throw an error if date input is not formatted as valid yyyy-mm-dd', function(){
    (function(){ mfpUrl('username', '2014-99-75'); }).should.throw(Error, "Date must be formatted as valid 'YYYY-MM-DD'");
    (function(){ mfpUrl('username', '2014-07-04-abcd'); }).should.throw(Error, "Date must be formatted as valid 'YYYY-MM-DD'");
  });
});
