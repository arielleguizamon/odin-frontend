var gulp = require('gulp'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    ngConfig = require('gulp-ng-config');

gulp.task('ng-config', function() {
  var configFile = fs.existsSync('config.local.json') ?
    'config.local.json' :
    'config.json';
  return gulp.src(configFile)
    .pipe(ngConfig('odin.config', {
      environment: process.env.NODE_ENV || 'dev'
    }))
    .pipe(rename('config.js'))
    .pipe(gulp.dest(gulp.paths.src + '/js'));
});

gulp.task('ng-version', function() {
  var versionFile = 'version.json';
  return gulp.src(versionFile)
    .pipe(ngConfig('odin.version'))
    .pipe(rename('version.js'))
    .pipe(gulp.dest(gulp.paths.src + '/js'));
});
