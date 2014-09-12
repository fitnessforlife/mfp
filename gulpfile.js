var gulp = require('gulp');
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');

// gulp.task('blanketTest', function () {
//   gulp.src(['tests/*.js'], { read: false })
//   .pipe(mocha({
//     reporter: 'spec'
//   }))
//   .pipe(blanket({
//     instrument:['tests/*.js'],
//     captureFile: 'tests/coverage/lcov.html',
//     reporter: 'html-cov'
//   }));
//
//   gulp.src('tests/coverage/lcov.info')
//   .pipe(coveralls());
// });

gulp.task('jshint', function ( cb ) {
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
  .on( 'finish', function(){
    gulp.src([
      './test/**/*.js'
    ])
    .pipe( mocha({ reporter: 'spec' }) )
    .pipe( istanbul.writeReports() )
    .on( 'end', function() {
      process.exit( 0 );
    });
  });
});

gulp.task('watch', function(){
  gulp.watch('./mfp_functions/**', ['jshint', 'test']);
  gulp.watch('./test/**', ['jshint', 'test']);
});

gulp.task('default', ['watch']);
