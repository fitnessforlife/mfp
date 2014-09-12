'use strict';

var should = require('chai').should();

var convertToNum = require('../mfp_functions/helper-utils.js').convertToNum;
var mfpUrl = require('../mfp_functions/helper-utils.js').mfpUrl;

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
    (function(){ convertToNum(true); }).should.throw(TypeError, "Input type must be 'string'");
    (function(){ convertToNum([]); }).should.throw(TypeError, "Input type must be 'string'");
    (function(){ convertToNum({}); }).should.throw(TypeError, "Input type must be 'string'");
    (function(){ convertToNum(null); }).should.throw(TypeError, "Input type must be 'string'");
    (function(){ convertToNum(undefined); }).should.throw(TypeError, "Input type must be 'string'");
    (function(){ convertToNum(1234); }).should.throw(TypeError, "Input type must be 'string'");
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
});
