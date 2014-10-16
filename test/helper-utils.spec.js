'use strict';
/*jshint -W083 */ //suppresses "Do not make functions within a loop warning"

var should = require('chai').should();

var convertToNum = require('../mfp_functions/helper-utils.js').convertToNum;
var mfpUrl = require('../mfp_functions/helper-utils.js').mfpUrl;
var formatDate = require('../mfp_functions/helper-utils.js').formatDate;

var nonStringTypes = [true, [], {}, null, 1234];

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

  it ('should convert strings of numbers with units to numbers', function(){
    (convertToNum('5,600mg')).should.equal(5600);
    (convertToNum('70g')).should.equal(70);
  });

  it('should throw an error if input is not a string', function(){
    for (var i = 0; i < nonStringTypes.length; i++) {
      (function(){ convertToNum( nonStringTypes[i] ); }).should.throw(TypeError, "Input type must be 'string'");
    }
  });

  it('should throw an error if input string doesn\'t contain numbers', function(){
    (function(){ convertToNum('abcd'); }).should.throw(Error, 'Input string must contain numbers');
  });

});

describe('mfpUrl', function(){
  it('should be a function', function(){
    (typeof mfpUrl).should.equal('function');
  });

  it('should construct a proper url when given a username and date', function(){
    (mfpUrl('azey47', '2014-07-08', '2014-07-08')).should.equal('http://www.myfitnesspal.com/reports/printable_diary/azey47?from=2014-07-08&to=2014-07-08');
  });

  it('should construct a proper url when only given a username', function(){
    (mfpUrl('azey47')).should.equal('http://www.myfitnesspal.com/reports/printable_diary/azey47');
  });

  it('should throw an error for non-string username inputs', function(){
    for (var i = 0; i < nonStringTypes.length; i++) {
      (function(){ mfpUrl( nonStringTypes[i], '2014-07-08' ); }).should.throw(TypeError, "User ID must be 'string'");
    }
  });

  it('should throw an error for non-string date inputs', function(){
    for (var i = 0; i < nonStringTypes.length; i++) {
      (function(){ mfpUrl( 'username', '2014-07-04', nonStringTypes[i] ); }).should.throw(TypeError, "Date must be 'string'");
      (function(){ mfpUrl( 'username', nonStringTypes[i], '2014-07-04' ); }).should.throw(TypeError, "Date must be 'string'");
    }
  });

  it('should throw an error if date input is not formatted as valid yyyy-mm-dd', function(){
    (function(){ mfpUrl('username', '2014-99-75', '2014-01-15'); }).should.throw(Error, "Date must be formatted as valid 'YYYY-MM-DD'");
    (function(){ mfpUrl('username', '2014-07-04', '2014-07-04-abcd'); }).should.throw(Error, "Date must be formatted as valid 'YYYY-MM-DD'");
  });
});

describe('formatDate', function(){
  it('should be a function', function(){
    (typeof formatDate).should.equal('function');
  });

  it('should throw an error if passed anything other than a date object', function(){
    (function(){ formatDate( [1,2,3] ); }).should.throw(Error, "argument must be a valid JavaScript Date object");
  });

  it('should format dates correctly', function(){
    (formatDate(new Date("August 1, 2015"))).should.equal('2015-08-01');
    (formatDate(new Date("December 15, 1999"))).should.equal('1999-12-15');
  });

});
