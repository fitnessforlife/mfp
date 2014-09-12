'use strict';

var should = require('chai').should();

var fetchSingleDate = require('../index.js').fetchSingleDate;

describe('fetchSingleDate', function(){
  it('should be a function', function(){
    (typeof fetchSingleDate).should.equal('function');
  });
});
