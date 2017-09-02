var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var pump = require('pump');

var scssAssets = [
    'src/**/*.scss'
];

// Tasks
gulp.task('sass:compile', function (cb) {
    pump([
        gulp.src(scssAssets),
        sass({outputStyle: 'compressed'}),
        rename({
            suffix: '.min'
        }),
        gulp.dest(function(file) {
            return file.base;
        })
    ], cb);
});

gulp.task('default', ['sass:compile']);

//Watch
gulp.task('all:watch', function () {
    gulp.watch(scssAssets, ['sass:compile']);
});

gulp.task('sass:watch', function () {
    gulp.watch(scssAssets, ['sass:compile']);
});
