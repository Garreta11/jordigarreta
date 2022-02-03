
var gulp = require('gulp');
var config  = require('../config');
var usemin = require('gulp-usemin2');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var pump = require('pump');
var filter = require('gulp-filter');
var handleErrors = require('../util/handleErrors');
var babel = require('gulp-babel');
var minifyCss = require('gulp-minify-css');
var minify = require('gulp-minify');

gulp.task('build', function() {
    const appFilter = filter(['**/*.js'], {restore: true});
    const cssFilter = filter(['**/*.css'], {restore: true});

    gulp.src(config.build.src)
        .pipe(usemin({
            rev:true
        }))
        .pipe(appFilter)
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            }}))
        .pipe(appFilter.restore)
        .pipe(cssFilter)
        .pipe(cleanCSS())
        .pipe(cssFilter.restore)

        .pipe(gulp.dest(config.build.dest))
        .on('error', handleErrors)
});