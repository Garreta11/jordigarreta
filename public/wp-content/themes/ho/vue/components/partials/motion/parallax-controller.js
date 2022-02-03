Vue.component('parallax-controller', {
	mixins: [mixinRoot,mixinViewport],

	data: () => ({
		items : null,
		scrollId : "",
		smoothScrolling : false,
		inited : false,
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
			if(this.$store.getters['settings/isGutenberg'] || this.isMobile)
				return;
				

			const body = document.querySelector('body');
			this.smoothScrolling = !!window.luxy;
			const nodeList = body.querySelectorAll('[data-parallax],[data-parallax-stagger],[data-parallax-animation]');
			const list = [];
			let item = null;


			for (let i = 0; i < nodeList.length; i++)
			{
				if(nodeList[i].getAttribute("data-parallax"))
				{
					item = new ParallaxMotionItem(nodeList[i]);

					if(item.inited)
						list.push(item);

				}
				else if(nodeList[i].getAttribute("data-parallax-stagger"))
				{
					item = new ParallaxStaggerItem(nodeList[i]);

					if(item.inited)
						list.push(item);
				}
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
			if(this.inited)
				return;
			this.inited = true;

			this.scrollId = requestAnimationFrame(this.animate.bind(this));
			this.animate();
		},

		animate : function() {
			this.update();
			this.scrollId = requestAnimationFrame(this.animate.bind(this));
		},

		update()
		{
			for (let i = 0; i < this.items.length; i++)
			{
				let item = this.items[i];

				if((this.isMobile && item.breakpoint.mobile) || (this.isTablet && item.breakpoint.tablet) || (this.isDesktop && item.breakpoint.desktop))
				{
					
					if(this.isVisibleHeightOnly(item.mask))
					{
						if(!item.inViewport)
						{
							item.init();
						}

						const element = this.viewport(item.mask);
						let perc = (-(element.y-window.innerHeight)/(window.innerHeight+element.h));
						item.translate(perc);
					}
					else
					{
						if(item.inViewport)
						{
							item.destroy();
						}
					}
				}
				else
				{
					if(item.inited)
					{
						item.destroy();
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

gsap.config({
	force3D: true,
	nullTargetWarn: true,
	units: {left: "vw", top: "vh", x:"vw",y:"px", rotation: "deg"}
});