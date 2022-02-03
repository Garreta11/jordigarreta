
var gulp = require('gulp');
var config  = require('../config');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var handleErrors = require('../util/handleErrors');

gulp.task('inject', function()
{
    gulp.src(config.inject.src)
        .pipe(inject(gulp.src([
            config.inject.watchLibs,
        ],{read: false}), {name: 'lib',ignorePath:config.inject.ignorePath,
            transform: function (filepath)
            {
                return '<script class="vendor" type="text/javascript" src="' + filepath + '"></script>';
            }
        }))

        .pipe(inject(gulp.src([
            config.inject.watchVueMixins,
            config.inject.watchPartials,
            config.inject.watchPods,
            config.inject.watchMixins,
            config.inject.watchVue,
        ],{read: false}), {name: 'app',ignorePath:config.inject.ignorePath,
            transform: function (filepath)
            {
                return '<script class="app" type="text/javascript" src="' + filepath + '"></script>';
            }
        }))
        .pipe(rename(config.inject.target))
        .pipe(gulp.dest(config.inject.dest))
        .on('error', handleErrors);
});


gulp.task('injectAdmin', function()
{
    gulp.src(config.adminInject.src)
        .pipe(inject(gulp.src([
            config.inject.watchLibs,
            config.inject.watchVueMixins,
            config.inject.watchPartials,
            config.inject.watchPods,
            config.inject.watchMixins,
            config.inject.watchVue,
        ],{read: false}), {name: 'gutenbergapp',ignorePath:config.inject.ignorePath,
            transform: function (filepath)
            {
                return '<script type="text/javascript" src="' + filepath + '"></script>';
            }
        }))

        .pipe(rename(config.adminInject.target))
        .pipe(gulp.dest(config.adminInject.dest))
        .on('error', handleErrors);
});
