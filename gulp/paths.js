var gulp = require('gulp');

gulp.paths = {
  index: './src/index.html',
  src: './src',
  prod: './dist',
  dev: './tmp',
  templates: [
    './src/views/**/*.html',
    './src/directives/**/*.html'
  ],
  static: [
    './src/fonts/**/*',
    './src/images/**/*',
    './src/*.{svg,png,xml,ico,txt}',
    './manifest.json'
  ]
};
