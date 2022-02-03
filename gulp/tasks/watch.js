var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', function()
{
	gulp.watch([
		config.inject.watchLibs,
		config.inject.watchVueMixins,
		config.inject.watchBlocks,
		config.inject.watchPods,
		config.inject.watchMixins,
		config.inject.watchVue,
		config.inject.watchPartials
	], ['inject']);



	gulp.watch([
		config.adminInject.watchLibs,
		config.adminInject.watchVueMixins,
		config.adminInject.watchBlocks,
		config.adminInject.watchPartials,
		config.adminInject.watchPods,
		config.adminInject.watchMixins,
		config.adminInject.watchVue,
	], ['injectAdmin']);


	gulp.watch([
		config.css.watchCss,
		config.css.watchApps,
		config.admin.watchAdmin,
		config.css.watchVueMixins,
		config.css.watchBlocks,
		config.css.watchPods,
		config.css.watchMixins,
		config.css.watchVue,
		config.css.watchPartials,
		config.css.watchHelper,
		config.css.watchStyleguide,
	], ['sass']);


	gulp.watch([
		config.styleguide.watchStyleguide
	], ['sass']);

});
