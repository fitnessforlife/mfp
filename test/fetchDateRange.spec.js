var should = require('chai').should();

var fetchDateRange = require('../index.js').fetchDateRange;

describe('fetchDateRange', function(){
  it('should be a function', function(){
    (typeof fetchDateRange).should.equal('function');
  });
});
