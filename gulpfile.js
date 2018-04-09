//gulpfile.js

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

//style paths
var sassFiles = 'src/view/public/sass/**/*.scss';
cssDest = 'src/view/public/css/';

gulp.task('styles', function () {
    gulp.src([sassFiles])
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(cssDest));
});
gulp.task('watch', function () {
    gulp.watch(sassFiles, ['styles']);
});