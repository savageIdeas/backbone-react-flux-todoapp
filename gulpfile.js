// -----------------------------------------------------------
// DEPENDENCIES
// -----------------------------------------------------------

// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var sass = require('gulp-sass');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// React (converts JSX->JS)
var react = require('gulp-react');

// Development Dependencies
var jshint = require('gulp-jshint');

// Run sequence (allows tasks to run in order)
var runSequence = require('run-sequence');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

// -----------------------------------------------------------
// LINT
// -----------------------------------------------------------

gulp.task('lint',['lint-js']);

// Lint JS
gulp.task('lint-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// -----------------------------------------------------------
// TEST
// -----------------------------------------------------------

gulp.task('test',['compile'], function() {
	runSequence('compile-tests','bundle-tests','run-tests');
});

// Convert JSX files to JS
gulp.task('compile-tests', function() {
  return gulp.src('test/src/**/*.js')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('test/compiled-tests'));
});

// Bundle tests
gulp.task('bundle-tests',['compile-tests'], function() {
  return gulp.src('test/compiled-tests/app-test.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('test/bundled-tests'));
});

// Run the tests
gulp.task('run-tests', ['bundle-tests'], function() {
  return gulp.src('test/app-test.html')
    .pipe(mochaPhantomjs());
});

// -----------------------------------------------------------
// COMPILE (JSX->JS and LESS->CSS) [Move from src->Build]
// -----------------------------------------------------------

gulp.task('compile',['compile-js','compile-less','compile-sass','compile-html','compile-css', 'compile-images']);

// Convert JSX files to JS
gulp.task('compile-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('build'));
});

// Compile LESS files
gulp.task('compile-less', function() {
  return gulp.src('src/css/less/**/*.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(gulp.dest('build/css'));
});

// Compile SASS files
gulp.task('compile-sass', function() {
    return gulp.src('src/css/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

// Move css files into build
gulp.task('compile-css', function() {
    gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css'));
});

// Move HTML files into build
gulp.task('compile-html', function() {
    gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

// Move images files into build
gulp.task('compile-images', function() {
    gulp.src('src/images/**/*.png')
    .pipe(gulp.dest('build/images'));
});

// -----------------------------------------------------------
// BUILD: Build->Public
// -----------------------------------------------------------

gulp.task('build', function() {
	runSequence(['browserify','copy-html','copy-css','copy-images'],['minify','uglify']);
});

// Browserify (Bundles the JS into a single file) and moves JS into public
gulp.task('browserify', function() {
  return gulp.src('build/js/app.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/javascripts'));
});

// Move HTML files
gulp.task('copy-html', function() {
    gulp.src('build/index.html')
    .pipe(gulp.dest('public'));
});

// Move CSS files
gulp.task('copy-css', function() {
    gulp.src('build/css/**/*.css')
    .pipe(gulp.dest('public/stylesheets'));
});

// Move images files
gulp.task('copy-images', function() {
    gulp.src('build/images/**/*.png')
    .pipe(gulp.dest('public/images'));
});

// Minify CSS
gulp.task('minify', function() {
  return gulp.src('public/stylesheets/app-sass.css')
    .pipe(minifyCSS())
    .pipe(rename('app-sass.min.css'))
    .pipe(gulp.dest('public/stylesheets'));
});

// Uglify JS
gulp.task('uglify', function() {
  return gulp.src('public/javascripts/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('public/javascripts'));
});

// -----------------------------------------------------------
// CLEAN
// -----------------------------------------------------------
// gulp.task('clean-public', function () {
//   return gulp.src('public/', {read: false})
//     .pipe(clean());
// });
//
// gulp.task('clean-build', function () {
//   return gulp.src('build/', {read: false})
//     .pipe(clean());
// });


// -----------------------------------------------------------
// WATCHES
// -----------------------------------------------------------

// Watch (auto detect changes)
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['default']);
});

// -----------------------------------------------------------
// DEFAULT
// -----------------------------------------------------------

// A single tasks to build the app
gulp.task('default', function() {
	runSequence('lint','compile','test','build');
});
