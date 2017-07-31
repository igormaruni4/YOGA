
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const concatCss = require('gulp-concat-css');
const compiler = require('google-closure-compiler-js').gulp();

/*********************************************
 * Объединение и минимизация CSS
 ***********************************************/

gulp.task('concat', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("main.min.css"))
    .pipe(gulp.dest('css/concat/'));
});

gulp.task('csso', function () {
  return gulp.src('css/concat/main.min.css')
    .pipe(csso())
    .pipe(gulp.dest('public'));
});

/*********************************************
 * Объединение и минимизация JS
 ***********************************************/

gulp.task('goog', function() {
  // select your JS code here
  return gulp.src('js/*.js', {base: './'})
    .pipe(compiler({
      compilation_level: 'SIMPLE',
      warning_level: 'DEFAULT',
      output_wrapper: '(function(){\n%output%\n}).call(this)',
      js_output_file: 'main.min.js',  // outputs single file
      create_source_map: true
    }))
    .pipe(gulp.dest('public'));
});

/*********************************************
 * Наблюдения за изменениями файлов
 ***********************************************/

gulp.task('styl', function () {
  return gulp.src('stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
  gulp.watch('stylus/*.styl', ['styl'])
});