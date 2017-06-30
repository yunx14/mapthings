var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});
