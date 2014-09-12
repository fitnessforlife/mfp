var should = require('chai').should();

var convertToNum = require('../mfp_functions/helper-utils.js').convertToNum;
var mfpUrl = require('../mfp_functions/helper-utils.js').mfpUrl;

describe('convertToNum', function(){
  it('should be a function', function(){
    (typeof convertToNum).should.equal('function');
  });
});

describe('mfpUrl', function(){
  it('should be a function', function(){
    (typeof mfpUrl).should.equal('function');
  });
});
