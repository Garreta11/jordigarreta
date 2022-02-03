'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var config      = require('../config');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {

	gulp.src(config.css.scss)
		.pipe(sourcemaps.init())
		.pipe(sass(config.css.sass)
			.on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.css.target));

	gulp.src(config.styleguide.scss)
		.pipe(sourcemaps.init())
		.pipe(sass(config.styleguide.sass)
			.on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.styleguide.target));

	gulp.src(config.admin.scss)
		.pipe(sourcemaps.init())
		.pipe(sass(config.admin.sass)
			.on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.admin.target));

	gulp.src(config.css.watchBlocks)
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest(function(file) {
			return file.base;
		}));
	gulp.src(config.css.watchApps)
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(gulp.dest(function(file) {
			return file.base;
		}));
});
