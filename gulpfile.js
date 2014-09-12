var gulp = require('gulp');
var mocha = require('gulp-mocha');
var coveralls = require('gulp-coveralls');

gulp.task('test', function(){
  return gulp.src('tests/*.js', {read: false})
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function(){
  gulp.watch('./mfp_functions/**', ['test']);
  gulp.watch('./tests/**', ['test']);
});

gulp.task('default', ['watch']);
