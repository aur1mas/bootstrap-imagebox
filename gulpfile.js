'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    lint = require('gulp-jslint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

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


gulp.task('compress', function() {
  gulp.src('bootstrap-imagebox.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
                if(path.extname === '.js') {
                    path.basename += '.min';
                }
            }))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['connect'])
