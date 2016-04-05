// Include gulp
var gulp = require('gulp');
// Define base folders
var src = 'src/';
var dest = 'build/';
// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(src + 'js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js'));
});
// Compile CSS from Sass files
gulp.task('sass', function () {
    return sass('src/scss/style.scss', {
            style: 'compressed'
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/css'));
});
// Watch for changes in files
gulp.task('watch', function () {
    // Watch .js files
    gulp.watch(src + 'js/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch(src + 'scss/*.scss', ['sass']);
});
// Default Task
gulp.task('default', ['scripts', 'sass', 'watch']);