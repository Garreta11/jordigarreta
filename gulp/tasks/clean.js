var gulp = require('gulp');
var config  = require('../config');
var handleErrors = require('../util/handleErrors');

var clean = require('gulp-clean');

gulp.task('clean', function()
{
    return gulp.src(config.build.dest, {read: false}).pipe(clean())
        .on('error', handleErrors);
});