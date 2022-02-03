Vue.component('motion-controller', {
	mixins: [mixinRoot,mixinViewport],

	data: () => ({
		items : null
	}),

	computed:{
		isMobile() {
			return this.$store.getters['settings/breakPointIsMobile'];
		},
		isTablet() {
			return this.$store.getters['settings/breakPointIsTablet'];
		},
		isDesktop() {
			return this.$store.getters['settings/breakPointIsDesktop'];
		}
	},
	methods: {
		setup()
		{
			if(this.$store.getters['settings/isGutenberg'])
				return;

			const body = document.querySelector('body');
			const nodeList = body.querySelectorAll('[data-motion-parallax]');
			const list = [];

			for (let i = 0; i < nodeList.length; i++)
			{
				let item = nodeList[i];

				const data = JSON.parse(item.getAttribute("data-motion-parallax"));
				const mask = item.querySelector(data.mask);
				const view = item.querySelector(data.child);
				let breakpoint = {mobile: true, tablet: true, desktop: true};

				if(!!data.breakpoint)
				{
					breakpoint = {mobile: false, tablet: false, desktop: false};

					if(data.breakpoint.mobile)
						breakpoint.mobile = true;

					if(data.breakpoint.tablet)
						breakpoint.tablet = true;

					if(data.breakpoint.desktop)
						breakpoint.desktop = true;
				}

				list.push({view:view,mask:mask,breakpoint:breakpoint,tween:data.tween,inViewport:-1});
			}

			this.items = list;

			if(this.items.length > 0)
				this.scrollSetup();

			this.loaded(nodeList);
		},

		loaded(nodeList)
		{
			for (let i = 0; i < nodeList.length; i++)
			{
				nodeList[i].classList.add('motionLoaded');
			}
		},

		scrollSetup()
		{
			this.scrollListen(this.scroll);
			this.scroll();
		},

		scroll()
		{
			for (let i = 0; i < this.items.length; i++)
			{
				let item = this.items[i];

				if(this.isVisibleHeightOnly(item.mask))
				{
					if(item.inViewport < 1)
					{
						item.inViewport = 1;
						TweenLite.set(item.view, {willChange: "transform"});
					}

					if((this.isMobile && item.breakpoint.mobile) || (this.isTablet && item.breakpoint.tablet) || (this.isDesktop && item.breakpoint.desktop))
					{
						const element = this.viewport(item.mask);
						let perc = (-(element.y-window.innerHeight)/(window.innerHeight+element.h));

						if(perc < 0)
							perc = 0;
						else if(perc > 1)
							perc = 1;

						let tween = {};

						for (const p in item.tween)
						{
							if(item.tween.hasOwnProperty(p))
							{
								const v = item.tween[p];
								const cur = (v[1]-v[0]) * perc;
								tween[p] = v[0] + cur;
							}
						}

						TweenLite.set(item.view,tween);
					}
					else
					{
						TweenLite.set(item.view,{clearProps:'all'});
					}
				}
				else
				{
					if(item.inViewport > 0)
					{
						item.inViewport = 0;
						TweenLite.set(item.view,{willChange:"auto"});
					}
				}
			}
		},
	},

	mounted () {
		if(this.isWindows && this.isEdge)
			return;

		TweenLite.delayedCall(.01,this.setup);
	},

	template: '<div></div>',
});