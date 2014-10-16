'use strict';

var fetchSingleDate = require('./index.js').fetchSingleDate;
var fetchDateRange = require('./index.js').fetchDateRange;

var logger = function(type, preTest){
  if (type === 'single') {
    console.log('Single Date Data: ', new Date() - preTest + 'ms');
  } else if (type === '5 days') {
    console.log('5 Days Data: ', new Date() - preTest + 'ms');
  } else if (type === '10 days') {
    console.log('10 Days Data: ', new Date() - preTest + 'ms');
  } else if (type === '20 days') {
    console.log('20 Days Data: ', new Date() - preTest + 'ms');
  }
};

var testSingleDay = function(){
  var preTest = new Date();
  fetchSingleDate('azey47', '2014-09-29', 'all', function(data){
    logger('single', preTest);
  });
};

var test5Days = function(){
  var preTest = new Date();
  fetchDateRange('azey47', '2014-09-29', '2014-10-03', 'all', function(data){
    logger('5 days', preTest);
  });
};

var test10Days = function(){
  var preTest = new Date();
  fetchDateRange('azey47', '2014-09-29', '2014-10-08', 'all', function(data){
    logger('10 days', preTest);
  });
};

var test20Days = function(){
  var preTest = new Date();
  fetchDateRange('azey47', '2014-09-29', '2014-10-18', 'all', function(data){
    logger('20 days', preTest);
  });
};

testSingleDay();
testSingleDay();
testSingleDay();
testSingleDay();
testSingleDay();

test5Days();
test5Days();
test5Days();
test5Days();
test5Days();

test10Days();
test10Days();
test10Days();
test10Days();
test10Days();

test20Days();
test20Days();
test20Days();
test20Days();
test20Days();
