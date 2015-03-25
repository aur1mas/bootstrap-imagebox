'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    lint = require('gulp-jslint');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['*.js', './example/*.html'])
    .pipe(connect.reload());
});

gulp.task('default', ['connect'])
