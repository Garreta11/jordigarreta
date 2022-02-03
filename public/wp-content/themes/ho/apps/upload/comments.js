window.addEventListener("DOMContentLoaded", () => {
	//console.log("LOADED!","special-gallery-petersburger");
	//var VueMasonryPlugin = window["vue-masonry-plugin"].VueMasonryPlugin
	//Vue.use(VueMasonryPlugin);


	Vue.component('comments', {
		mounted: function () {

		},

		updated: () => {
			console.log("UPDATED!");
		}
	});
});