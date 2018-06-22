var gulp = require('gulp');
var src = gulp.paths.src;

gulp.task('watch', ['serve'], function() {
  // Static Files
  gulp.watch(gulp.paths.static, ['static-watch']);

  // Templates
  gulp.watch(gulp.paths.templates, ['templates-watch']);

  // Vendors
  gulp.watch([
    src + '/plugins/**',
    src + '/index.html'
    ], ['vendors-watch']);

  // Javascript
  gulp.watch([
    src + '/js/**/*.js',
    'config.json',
    'config.local.json'
    ], ['javascript-watch']);

  // Style
  gulp.watch([
    src + '/css/**/*.{css,scss}'
    ], ['styles']);
});

// Watch subtasks
gulp.task('static-watch', ['static'], function (done) {
  gulp.browserSync.reload();
  done();
});

// Watch subtasks
gulp.task('templates-watch', ['templates'], function (done) {
  gulp.browserSync.reload();
  done();
});

gulp.task('vendors-watch', ['vendors'], function (done) {
  gulp.browserSync.reload();
  done();
});

gulp.task('javascript-watch', ['bundle-general', 'bundles'], function (done) {
  gulp.browserSync.reload();
  done();
});
