const storeSettings = {
	namespaced: true,

	state:
		{
			isBusy : false,
			isSmoothScroll : false,
			isTouch : (( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 )),
			retina: (window.devicePixelRatio > 1),
			isGutenberg : document.body.classList.contains("wp-admin"),
			language : document.querySelector("html").attributes.getNamedItem("lang").value,
			menu : false,
			sticky : false,
			menuMinified : false,
			submenu : false,
			viewportWidth : window.innerWidth,
			breakPointIsMobile : (window.innerWidth < 764),
			breakPointIsTablet : (window.innerWidth >= 764 && window.innerWidth <= 1024),
			breakPointIsDesktop : (window.innerWidth > 1024),
			submenuTitle : ""
		},

	getters :
		{
			menuOpen : state => state.menu,
			submenuOpen : state => state.submenu,
			submenuTitle : state => state.submenuTitle,
			sticky : state => state.sticky,
			menuMinified : state => state.menuMinified,
			isGutenberg : state => state.isGutenberg,
			isTouch : state => state.isTouch,
			retina : state => state.retina,
			language: state => state.language,
			breakPointIsMobile : state => state.breakPointIsMobile,
			breakPointIsTablet : state => state.breakPointIsTablet,
			breakPointIsDesktop : state => state.breakPointIsDesktop,
			viewportWidth : state => state.viewportWidth,
		},

	mutations : {
		init(state)
		{

		},

		resize(state)
		{
			state.viewportWidth = window.innerWidth;
			state.breakPointIsMobile = state.viewportWidth < 764;
			state.breakPointIsTablet = (state.viewportWidth >= 764 && state.viewportWidth <= 1024);
			state.breakPointIsDesktop = state.viewportWidth > 1024;
		},

		menuOpen(state)
		{
			state.menu = true;
		},

		menuClose(state)
		{
			state.menu = false;

			if(state.submenu !== false)
				state.submenu = false;
		},

		submenuOpen(state,value)
		{
			state.submenu = value;
		},

		submenuTitle(state,value)
		{
			state.submenuTitle = value;
		},

		submenuClose(state)
		{
			state.submenu = false;
		},

		menuStickyEnable(state)
		{
			state.sticky = true;
		},

		menuStickyDisable(state)
		{
			state.sticky = false;
		},

		menuMinifiedEnable(state)
		{
			state.menuMinified = true;
		},

		menuMinifiedDisable(state)
		{
			state.menuMinified = false;
		}
	},

	actions : {
		init(context,data)
		{
			context.commit('init');
			context.commit('resize');
			window.addEventListener('resize', () => context.commit('resize'));
		},

		menuToggle(context,value)
		{
			if(value.query === true)
			{
				context.commit('menuOpen');
			}
			else
			{
				context.commit('menuClose');
			}
		},

		submenuToggle(context,value)
		{
			if(value.query !== false && value.query.open)
			{
				context.commit('submenuTitle',value.query.title);
				context.commit('submenuOpen',value.query.id);
			}
			else
			{
				context.commit('submenuClose');
			}
		},

		menuMinifiedToggle(context,value)
		{
			if(value.query === true)
			{
				context.commit('menuMinifiedEnable');
			}
			else
			{
				context.commit('menuMinifiedDisable');
			}
		},

		stickyToggle(context,value)
		{
			if(value.query === true)
			{
				context.commit('menuStickyEnable');
			}
			else
			{
				context.commit('menuStickyDisable');
			}
		}
	}
};