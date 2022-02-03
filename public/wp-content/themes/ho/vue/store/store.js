const store = new Vuex.Store({
	modules: {
		settings : storeSettings
	},
	actions : {
		admin(context) {
		},

		init(context) {
			context.dispatch('settings/init');
		},

		bookmarks(context) {
			context.dispatch('settings/init');
		},

		fetch(context,data) {
		}
	}
});

window.store = store; // SAFARI BUG