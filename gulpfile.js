/* jshint node: true */

'use strict';

var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylus      = require('gulp-stylus'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleanCSS    = require('gulp-clean-css');


gulp.task('lint', function () {
  return gulp.src(['src/js/**/*.js', '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('stylus', function () {
  return gulp.src('src/stylus/screen.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(concat('screen.css'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('css-min', function () {
  return gulp.src('assets/css/screen.css')
    .pipe(cleanCSS())
    .pipe(concat('screen.min.css'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js-min', function () {
  return gulp.src('src/js/index.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/stylus/**/*.styl', ['stylus', 'css-min']);
  gulp.watch('src/js/**/*.js', ['lint', 'js-min']);
});

gulp.task('build', ['lint', 'stylus', 'js-min', 'css-min']);