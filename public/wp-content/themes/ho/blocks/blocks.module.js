class Blocks {
	constructor() {
		window.addEventListener("load", () => {
			var hasVueless = document.querySelectorAll('#blocks section.block.vueless');
			if (hasVueless.length) {
				/* Render each block separately */
				var apps = document.querySelectorAll('#blocks section.block:not(.vueless)');
				[].forEach.call(apps, function(node) {
					this.render(node, 'init');

				});
			} else {
				/* Render whole block as one app */

				this.render('blocks', 'init');
			}
		});
	}

	render(node, initType)
	{
		if (typeof node == 'string') node = document.getElementById(node);
		window.renderType = initType;

		if(node) {
			store.dispatch({type: initType});
			Vue.use(VueRouter);

			new Vue({
				el: node,
				store,
				router,
				mixins: [mixinRoot]
			});
		}
	}
}

export { Blocks };