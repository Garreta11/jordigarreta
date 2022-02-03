var gulp = require('gulp');
var config  = require('../config');
var handleErrors = require('../util/handleErrors');

var copy = require('gulp-copy');

gulp.task('copy',['clean'], function()
{
    return gulp.src(config.build.copy, {base: '.' })
        .pipe(copy(config.build.dest,{prefix:1}))
        .on('error', handleErrors);
});