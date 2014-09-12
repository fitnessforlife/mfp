'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var diaryStatusCheck = require('../mfp_functions/diaryStatusCheck.js');

describe('diaryStatusCheck', function(){
  it('should be a function', function(){
    (typeof diaryStatusCheck).should.equal('function');
  });

  it('should pass a "public" string to a callback when accessing a public diary', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    diaryStatusCheck('npmmfp', function(status){
     (status).should.equal('public');
    });
  });

  it('should pass a "private" string to a callback when accessing a private diary', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html');

    diaryStatusCheck('npmmfp', function(status){
      (status).should.equal('private');
    });
  });

  it('should pass a "private" string to a callback when accessing a password-protected diary', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-password.html');

    diaryStatusCheck('npmmfp', function(status){
      (status).should.equal('private');
    });
  });

  it('should pass an "invalid user" string to a callback when accessing a diary that doesn\'t exist', function(){
    nock("http://www.myfitnesspal.com")
      .get("/food/diary/asldfjkb3498a")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html');

    diaryStatusCheck('asldfjkb3498a', function(status){
      (status).should.equal('invalid user');
    });
  });
});
