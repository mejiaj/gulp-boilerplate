var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  del = require('del'),
  svgo = require('gulp-svgo'),
  svgSprites = require('gulp-svg-sprites'),
  svg2png = require('gulp-svg2png'),
  runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['gbp-configs'].directories;

gulp.task('styles', function() {
  return sass(dirs.lib + '/scss/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(dirs.dist + '/css'))
    .pipe(notify({ message: 'Styles task complete' }))
});

gulp.task('scripts', function() {
  return gulp.src(dirs.lib + '/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dirs.dist + '/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dist + '/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('svgSprite', function () {
  return gulp.src(dirs.lib + '/sprite/*')
    .pipe(svgo())
    .pipe(svgSprites({
      cssFile: '../' + dirs.lib + '/scss/_sprite.scss',
      preview: false,
      layout: 'vertical',
      padding: 5,
      svg: {
          sprite: 'img/sprite.svg'
      },
      templates: {
          css: require("fs").readFileSync(dirs.lib + '/tpl/' + 'sprite-template.scss', "utf-8")
      }
    }))
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('pngSprite', ['svgSprite'], function() {
  return gulp.src(dirs.dist + '/img/sprite.svg')
    .pipe(svg2png())
    .pipe(gulp.dest(dirs.dist + '/img/'));
});

gulp.task('clean', function(cb) {
  del([dirs.dist, 'lib/scss/_sprite.scss'], cb)
});

gulp.task('default', ['clean'], function(callback) {
  runSequence(['svgSprite', 'pngSprite'],
              'styles',
              'scripts',
              callback);
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(dirs.lib + '/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(dirs.lib + '/js/**/*.js', ['scripts']);

  // Watch sprite files
  gulp.watch(dirs.lib + '/sprite/**/*.svg', ['svgSprite'], ['pngSprite']);

});
