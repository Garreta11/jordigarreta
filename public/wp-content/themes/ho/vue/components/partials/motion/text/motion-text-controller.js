Vue.component('motion-text-controller', {
	mixins: [mixinRoot,mixinViewport],

	data: () => ({
		items : null,
		scrollId : "",
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
			if(this.$store.getters['settings/isGutenberg'])
				return;

			const body = document.querySelector('body');
			const nodeList = body.querySelectorAll('[data-motion-text]');
			const list = [];

			for (let i = 0; i < nodeList.length; i++)
			{
				let item = nodeList[i];

				const data = JSON.parse(item.getAttribute("data-motion-text"));
				const mask = item.querySelector(data.child);
				let split = true;
				let force = false;

				if(data.split !==undefined && !data.split)
				{
					split = false;
				}

				if(data.force !==undefined)
				{
					if(!!data.force)
					{
						force = true;
					}
				}


				if(split)
				{
					//console.log("BREAK:",data);

					try
					{
						data.splitText = new SplitText(mask, {type:"lines",linesClass:"data-motion-text"});
					}
					catch (e)
					{
						data.splitText = {lines: [mask]};
					}
				}
				else
				{
					//console.log("NO_BREAK:",item.querySelectorAll(data.child));
					data.splitText = {lines: item.querySelectorAll(data.child)};
				}


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


				for (let i = 0; i < data.splitText.lines.length; i++)
				{
					//console.log("WRAP:",data.splitText.lines[i]);
					this.wrap(data.splitText.lines[i]);
					TweenLite.set(data.splitText.lines[i],{y:120,autoAlpha:0,willChange: "transform,opacity"});
				}

				let motionItem = {lines:data.splitText.lines,mask:mask,breakpoint:breakpoint,played:0,inViewport:-1};

				if(force)
				{
					console.log("FORCE:",force,motionItem);
					this.show(motionItem);
				}

				list.push(motionItem);
			}

			this.items = list;

			if(this.items.length > 0)
			{
				this.initViewport()
				this.scrollSetup();
			}
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

		wrap(el) {
			try
			{
				const wrapper = document.createElement('div');
				wrapper.className = 'data-motion-text-wrapper';
				el.parentNode.insertBefore(wrapper, el);
				wrapper.appendChild(el);
			}
			catch (e)
			{
				console.log("ERROR:",el);
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

		show(item)
		{
			if(!item.played)
			{
				for (let i = 0; i < item.lines.length; i++)
				{
					TweenLite.to(item.lines[i],.8,{y:0,autoAlpha:1,ease:Expo.easeOut,delay:.15*i});
				}

				item.played = true;
			}
		},

		initViewport()
		{
			for (let i = 0; i < this.items.length; i++)
			{
				let item = this.items[i];

				if(this.isVisibleHeightOnly(item.mask))
				{
					if(item.inViewport < 1)
					{
						item.inViewport = 1;
						TweenLite.set(item.mask, {willChange: "transform"});
					}

					this.show(item);
				}
				else
				{
					if(item.inViewport > 0)
					{
						item.inViewport = 0;
						TweenLite.set(item.mask,{willChange:"auto"});
					}
				}
			}
		},

		update()
		{
			for (let i = 0; i < this.items.length; i++)
			{
				let item = this.items[i];

				if(this.isVisibleHeightOnly(item.mask))
				{
					if(item.inViewport < 1)
					{
						item.inViewport = 1;
						TweenLite.set(item.mask, {willChange: "transform"});
					}


					if((this.isMobile && item.breakpoint.mobile) || (this.isTablet && item.breakpoint.tablet) || (this.isDesktop && item.breakpoint.desktop))
					{
						const element = this.viewport(item.mask);
						let perc = (-(element.y-window.innerHeight)/(window.innerHeight+element.h));

						if(perc < 0)
							perc = 0;
						else if(perc > 1)
							perc = 1;

						//console.log(perc);

						let pT = .2;
						let pB = .9;

						if(this.isMobile)
						{
							pT = 0;
						}


						if(perc > pT && perc < pB)
						{
							this.show(item);
						}
					}
					else
					{
						TweenLite.set(item.mask,{clearProps:'all'});
					}
				}
				else
				{
					if(item.inViewport > 0)
					{
						item.inViewport = 0;
						TweenLite.set(item.mask,{willChange:"auto"});
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