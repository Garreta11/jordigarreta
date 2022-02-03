window.addEventListener("DOMContentLoaded", function() {
	Vue.component('site-anchor', {
		mixins: [mixinViewport],

		data: () => ({
			visible : false,
			lastScrollTop : 99999999
		}),

		computed:{
			isMobile() {
				return window.innerWidth < 764;
			},
		},

		methods: {
			show()
			{
				this.visible = true;
				TweenLite.to(this.$refs.view, .8, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
			},

			hide()
			{
				this.visible = false;

				let ease = Expo.easeIn;

				if(this.isMobile)
				{
					ease = Expo.easeOut;
				}

				TweenLite.to(this.$refs.view, .4, {autoAlpha:0,y:100,ease:ease});
			},
			scroll()
			{
				const item = this.viewport(this.$refs.view);
				const doc = document.documentElement;
				const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
				const bottom = top + window.innerHeight;
				const height = document.body.clientHeight;
				const footerHeight = 350;
				const minTopScrollVisible = 350;


				if(this.isMobile)
				{
					if (top > this.lastScrollTop) {
						// downscroll code
						if(this.visible)
						{
							console.log("DOWN",top);
							this.hide();
						}
					} else {
						// upscroll code
						if(!this.visible)
						{
							console.log("UP",top);
							this.show();
						}
					}
				}
				else
				{
					if(bottom+footerHeight > height || top < minTopScrollVisible) // || top < minTopScrollVisible
					{
						if(this.visible)
						{
							this.hide();
						}
					}
					else
					{
						if(!this.visible && top > minTopScrollVisible)
						{
							this.show();
						}
					}
				}

				this.lastScrollTop = top <= 0 ? 0 : top; // For Mobile or negative scrolling
			},

			scrollSetup()
			{
				this.scrollListen(this.scroll);
				this.scroll();
			},

			start()
			{
				if(this.isMobile)
				{
					const doc = document.documentElement;
					const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
					this.lastScrollTop = top;
					this.scrollSetup();
					console.log("SHOW.INIT",top);
					this.show();
				}
			},

			select(id)
			{
				let margin = 0;

				if(window.innerWidth >= 780)
				{
					margin = 0;
				}

				TweenLite.to(window, .8, {scrollTo:{y:document.querySelector('#'+id),offsetY:margin,autoKill: false},ease:Expo.easeOut});
			},
		},

		mounted () {
			this.$nextTick(() => {

				console.log("IS_MOBILE:",this.isMobile);

				if(this.isMobile)
				{
					this.show();
					TweenLite.delayedCall(.5,this.start);
				}
				else
				{
					this.scrollSetup();
				}
			});
		}
	});
});