'use strict';

var should = require('chai').should();
var nock = require('nock');
var request = require('request');

var diaryStatusCheck = require('../index.js').diaryStatusCheck;

describe('diaryStatusCheck', function(){
  it('should be a function', function(){
    (typeof diaryStatusCheck).should.equal('function');
  });

  it('should pass a "public" string to a callback when accessing a public diary', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-public.html');

    diaryStatusCheck('npmmfp', function(status){
     (status).should.equal('public');
     done();
    });
  });

  it('should pass a "private" string to a callback when accessing a private diary', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-private.html');

    diaryStatusCheck('npmmfp', function(status){
      (status).should.equal('private');
      done();
    });
  });

  it('should pass a "private" string to a callback when accessing a password-protected diary', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/npmmfp")
      .replyWithFile(200, __dirname + '/mocks/diary-password.html');

    diaryStatusCheck('npmmfp', function(status){
      (status).should.equal('private');
      done();
    });
  });

  it('should pass an "invalid user" string to a callback when accessing a diary that doesn\'t exist', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/asldfjkb3498a")
      .replyWithFile(200, __dirname + '/mocks/diary-invalid.html');

    diaryStatusCheck('asldfjkb3498a', function(status){
      (status).should.equal('invalid user');
      done();
    });
  });

  it('should pass an "invalid user" string to a callback when accessing a page that doesn\'t exist', function(done){
    nock("http://www.myfitnesspal.com")
      .get("/reports/printable_diary/http://www.myfitnesspal.com")
      .replyWithFile(200, __dirname + '/mocks/diary-404-page.html');

    diaryStatusCheck('http://www.myfitnesspal.com', function(status){
      (status).should.equal('invalid user');
      done();
    });
  });
});
