'use strict';

var gulp = require('gulp');
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');

gulp.task('lint', function ( cb ) {
  gulp.src([
    './!(coverage|node_modules)/**/*.js'
  ])
  .pipe( jshint() )
  .pipe( jshint.reporter( stylish ) );
});

gulp.task('test', function(cb){
  gulp.src([
    './mfp_functions/**/*.js',
    './index.js'
  ])
  .pipe( istanbul() )
  .pipe(istanbul.hookRequire()) // Force `require` to return covered files
  .on( 'finish', function(){
    gulp.src([
      './test/**/*.js'
    ])
    .pipe( mocha({ reporter: 'spec' }) )
    .pipe( istanbul.writeReports() )
    .on( 'end', cb);
  });
});

gulp.task('coveralls', function(cb){
  return gulp.src('./coverage/lcov.info')
  .pipe(coveralls());
});

gulp.task('watch', function(){
  gulp.watch('./mfp_functions/**', ['lint', 'test']);
  gulp.watch('./test/**', ['lint', 'test']);
});

gulp.task('default', ['watch']);
