var child_process = require('child_process');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bower = require('gulp-bower'),
    jshint = require('gulp-jshint'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    sequence = require('run-sequence');


var paths = {
    js: [
      'public/js/*'
    ],
    templates: [
      'public/templates/*'
    ],
    sass:[
      'public/sass/*'
    ],
    css: [
      'public/css/*'
    ],
    img: [
      'public/img/*'
    ],
    components: [
      'public/components/**/*'
    ],
    html: [
      'public/index.html'
    ],
    dist: 'dist/'
}

/**
 * Delete the build folder, and everything in it
 */
gulp.task('clean', function() {
    return del(paths.dist);
});

/**
* Compiles Sass files to css
*/
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

/**
 * Run bower. Bower target path is defined in .bowerrc. Packages defined in bower.json
*/
gulp.task('bower', function() {
    return bower();
});

/**
 * Jshint helps detect errors and potential problems in JavaScript code
 */
gulp.task('lint', function() {
    // don't lint the facestypeahead.js
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * copy angular templates into dist.
 */
gulp.task('templates', function() {
    return gulp.src(paths.templates)
        .pipe(gulp.dest(paths.dist + 'templates/'));
});

/**
 * copy img into dist
 */
gulp.task('img', function() {
    return gulp.src(paths.img)
        .pipe(gulp.dest(paths.dist + 'img/'));
});

/**
 * Copies all vendor files
 */
gulp.task('components', function() {
    return gulp.src(paths.components)
        .pipe(gulp.dest(paths.dist + 'components/'));
});

/**
 * Concat and minify JavaScript files
 */
gulp.task('scripts', function() {

    return gulp.src(paths.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.dist + 'js/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest(paths.dist + 'js/'));

});

/**
 * Replace script and css tags in index.html
 */
gulp.task('htmlreplace', function() {

    return gulp.src('public/index.html')
        .pipe(htmlreplace({
          scripts: 'js/all.min.js'
        }))
        .pipe(gulp.dest(paths.dist));

});

gulp.task('assets', ['sass', 'img', 'templates', 'components']);

gulp.task('default', function(done){
  sequence(['clean'], ['bower', 'lint'], ['assets', 'scripts', 'htmlreplace'], done)
});
