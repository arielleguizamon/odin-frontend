var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

require('./paths.js');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('bundles', [
  'bundle-home',
  'bundle-dataset',
  'bundle-dataset-list',
  'bundle-contact',
  'bundle-layout'
]);

gulp.task('bundle-home', function() {
  return gulp.src([
      src + '/js/controllers/home/*.js',
      src + '/js/controllers/cacheController.js',
      src + '/js/directives/home/*.js',
      src + '/js/directives/dataset-list/datasetFiletypesDirective.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-home.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('bundle-dataset', function() {
  return gulp.src([
      src + '/js/controllers/dataset/*.js',
      src + '/js/controllers/dataset-general/*.js',
      src + '/js/controllers/cacheController.js',
      src + '/js/directives/dataset-general/*.js',
      src + '/js/directives/dataset/*.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-dataset.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify()  )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('bundle-dataset-list', function() {
  return gulp.src([
      src + '/js/controllers/dataset-list/*.js',
      src + '/js/controllers/dataset-general/*.js',
      src + '/js/controllers/cacheController.js',
      src + '/js/directives/dataset-general/*.js',
      src + '/js/directives/dataset-list/*.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-dataset-list.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify()  )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('bundle-contact', function() {
  return gulp.src([
      src + '/js/controllers/contactController.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-contact.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify()  )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('bundle-layout', function() {
  return gulp.src([
      src + '/js/controllers/layoutController.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle-layout.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify()  )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});
