var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    nano = require('gulp-cssnano');

var src = gulp.paths.src,
    env = process.env.NODE_ENV || 'dev',
    dest = (env === 'dev') ? gulp.paths.dev : gulp.paths.prod;

gulp.task('styles', function () {
 return gulp.src(src + '/css/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
    .pipe(sass())

  .pipe(sourcemaps.write())
  .pipe(rename('bundle.min.css'))

  .pipe((env === 'dev') ? util.noop() : nano())
  .pipe(gulp.dest(dest))
  .pipe(gulp.browserSync.stream());
});
