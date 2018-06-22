var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('lazy-loading', [
  'lazy-dataset',
  'lazy-dataset-list',
  'lazy-contact',
  'lazy-layout',
]);

gulp.task('lazy-contact', function() {
  return gulp.src([
      // 'plugins/angular-recaptcha.min.js',
      'bower_components/ng-alertify/dist/ng-alertify.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-contact.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('lazy-layout', function() {
  return gulp.src([
      'node_modules/angular-pdf/dist/angular-pdf.min.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-layout.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('lazy-dataset-list', function() {
  return gulp.src([
      // 'plugins/angular-recaptcha.min.js',
      src + '/plugins/paging/paging.js',
      'bower_components/angular-read-more/dist/readmore.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-dataset-list.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('lazy-dataset', function() {
  return gulp.src([
      // 'plugins/angular-recaptcha.min.js',
      src + '/plugins/paging/paging.js',
      src + '/plugins/leaflet/leaflet-src.js',
      src + '/plugins/leaflet/angular-leaflet-directive.min.js',
      'bower_components/angular-read-more/dist/readmore.js',
      src + '/plugins/angular-socialshare.min.js'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('lazy-dataset.min.js'))
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe((env === 'dev') ? util.noop() : uglify() )//: util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});
