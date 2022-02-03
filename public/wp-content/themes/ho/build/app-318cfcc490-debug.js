var mixinRoot = {
	data: () => {
		return {
			scrollPos:0,
			body: null,
			retina: (window.devicePixelRatio > 1),
			mobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
			isFirefox : (/firefox/i.test(navigator.userAgent.toLowerCase())),
			isWindows : (/win/i.test(navigator.platform.toLowerCase())),
			isWebkit : (/webkit/i.test(navigator.userAgent.toLowerCase())),
			isEdge : (/edge/i.test(navigator.userAgent.toLowerCase())),
		}
	},

	computed: {
		lock: {
			get: function() {
				return this.body.classList.contains("lock");
			},

			set: function(value) {
				if(value)
				{
					if(this.isWindows)
					{
						this.scrollPos = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
						window.addEventListener('scroll', this.scrollPreventDefault);
					}
					else
						this.body.classList.add("lock");
				}
				else
				{
					this.body.classList.remove("lock");
					window.removeEventListener('scroll', this.scrollPreventDefault);
				}
			}
		},

		disableLinks: {
			get: function() {
				return this.body.classList.contains("disable-links");
			},

			set: function(value) {
				if(value)
				{
					this.body.classList.add("disable-links");
				}
				else
				{
					this.body.classList.remove("disable-links");
				}
			}
		}
	},

	methods: {
		scrollPreventDefault(event)
		{
			window.scrollTo(0, this.scrollPos);
			event.preventDefault();
			event.stopPropagation();
			return true;
		},

		removeHoverCSS()
		{
			try
			{
				var ignore = /:hover/;
				for (var i = 0; i < document.styleSheets.length; i++)
				{
					var sheet = document.styleSheets[i];
					if (!sheet.cssRules)
					{
						continue;
					}
					for (var j = sheet.cssRules.length - 1; j >= 0; j--)
					{
						var rule = sheet.cssRules[j];
						if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText))
						{
							sheet.deleteRule(j);
						}
					}
				}
			}
			catch (e)
			{
			}
		}
	},

	created () {
		this.body = document.getElementsByTagName("body")[0];

		if (this.mobile)
			this.removeHoverCSS();

		let vh = window.vhCheck();

		let vh100 = window.innerHeight * 1.00001;
		document.documentElement.style.setProperty('--vh', `${vh100}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			let vh100 = window.innerHeight * 1;
			document.documentElement.style.setProperty('--vh', `${vh100}px`);
		});
	},
};;

var mixinViewport = {
	created : function () {
		this.frameBasedFunc = null;
	},

	methods: {
		/**
		 * GET ITEM POSITION AND SIZE
		 * @param el
		 * @returns {{t: number, w: number, h: number, l: number}|boolean}
		 */
		viewport(el)
		{
			if(!!el)
			{
				var rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				return {t: rect.top + scrollTop, l: rect.left + scrollLeft,x: rect.x, y:rect.y,w:rect.width,h:rect.height}
			}
			else
			{
				return false;
			}
		},

		/**
		 * IS ELEMENT COMPLETE VISIBLE IN VIEWPORT
		 * @param el
		 * @returns {boolean|boolean}
		 */
		isVisibleHeightOnly(el)
		{
			const item = this.viewport(el);
			const doc = document.documentElement;
			const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			const bottom = top + window.innerHeight;

			const left = 0;
			const right = left + window.innerWidth;

			const t = top - item.h;
			const b = bottom + item.h;
			const l = left - item.w;
			const r = right + item.w;

			const vH = (t < item.t && b > (item.t + item.h));
			const vW = (l < item.l && r > (item.x + item.w));

			if(vH)
			{
				if(vW)
					return true;
			}

			return false;
		},

		/**
		 * HAS USER SCROLLED OVER THE ITEM TOP POSITION
		 * @param el
		 * @returns {boolean|boolean}
		 */
		isSticky(el)
		{
			const item = this.viewport(el);
			const doc = document.documentElement;
			const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

			return (top >= item.t);
		},

		scrollListen(func)
		{
			var doc = window;

			console.log("scrollListen: ",this.$el);

			if(document.getElementsByClassName("interface-interface-skeleton__content").length > 0)
			{
				doc = document.getElementsByClassName("interface-interface-skeleton__content")[0];
			}

			if(window.smoothScroll)
			{
				window.smoothScroll.on('scroll', func);
			}
			else
			{
				doc.addEventListener('scroll', func,{passive: true});
			}
		},

		animationFrameListen(func)
		{
			console.log("animationFrameListen");
			this.frameBasedFunc = func;
			requestAnimationFrame(this.animationFrameUpdate);
		},

		animationFrameUpdate()
		{
			if(!!this.frameBasedFunc)
			{
				this.frameBasedFunc();
				requestAnimationFrame(this.animationFrameUpdate);
			}
		},

		animationFrameListenKill()
		{
			console.log("animationFrameListenKill");
			this.frameBasedFunc = null;
		},

		scrollListenKill(func)
		{
			var doc = window;

			if(document.getElementsByClassName("block-editor-editor-skeleton__content").length > 0)
			{
				doc = document.getElementsByClassName("block-editor-editor-skeleton__content")[0];
			}

			if(window.smoothScroll)
			{
				window.smoothScroll.off('scroll', func);
			}
			else
			{
				doc.removeEventListener('scroll', func,{passive: true});
			}
		}
	}
};;

Vue.component('audio-player-inline', {
	mixins: [mixinViewport],

	data: () => ({
		playing: false,
		percent : 0,
		time: 0,
		end: 0
	}),

	computed: {

	},

	methods: {
		play()
		{
			if(!this.playing)
			{
				this.playing = true;
				this.$refs.audio.play();
			}
			else
			{
				this.playing = false;
				this.$refs.audio.pause();
			}
		},
	},

	mounted () {
		this.progress = this.$refs.progress;

		this.$refs.audio.onloadedmetadata = () =>
		{
			this.start = this.$refs.audio.currentTime;
			this.end = this.$refs.audio.duration;
		};

		this.$refs.audio.ontimeupdate = () =>
		{
			this.time = this.$refs.audio.currentTime;
			this.end = this.$refs.audio.duration;
			this.percent = (this.$refs.audio.currentTime / this.$refs.audio.duration * 100);
		};

		this.$refs.audio.load();
	}
});;

Vue.component('lazy-media-inline', {
	data: function () {
		return {
			sizes: null,
			path: null,
			alt: '',
			video: null,
			youtubelabel: '',
			autoplay : null,
			youtube : null,
			crop : null,
			brightness : 100,
			background: false,
			scale : 1,
			isOpen: false
		}
	},

	methods: {

		toggle()
		{
			if(!this.isOpen)
			{
				this.open();
			}
			else
			{
				this.close();
			}
		},

		open()
		{
			this.isOpen = true;

			TweenLite.killTweensOf(this.$refs.body);
			TweenLite.set(this.$refs.body,{display:"block"});
			TweenLite.to(this.$refs.body,.8,{height:this.$refs.body.scrollHeight,ease:Expo.easeOut,onComplete:this.openComplete});
		},

		openComplete()
		{
			TweenLite.set(this.$refs.body,{overflow:"visible",height:"auto"});
		},

		close()
		{
			this.isOpen = false;

			TweenLite.killTweensOf(this.$refs.body);
			TweenLite.set(this.$refs.body,{overflow:"hidden",display:"block",height:this.$refs.body.scrollHeight});
			TweenLite.to(this.$refs.body,.8,{height:0,ease:Expo.easeOut,onComplete:this.closeComplete});
		},

		closeComplete()
		{
			TweenLite.set(this.$refs.body,{overflow:"hidden",height:0,display:"none"});
		},
	},

	mounted () {
		let data = JSON.parse(this.$refs.data.innerHTML);
		this.sizes = data.sizes;
		this.alt = data.alt;
		this.path = data.path;
		this.video = data.video;
		this.autoplay = data.autoplay;
		this.youtube = data.youtube;
		this.youtubelabel = data.youtubelabel;
		this.crop = data.crop;
		this.brightness = parseInt(data.brightness)/100;
		this.background = (data.background === true);

		if(!!data.scale && !isNaN(data.scale) && data.scale > 1)
		{
			this.scale = data.scale;
		}
	}
});;

window.addEventListener("load", function () {
  var app = document.getElementById("site-footer");
  if (app) {
    new Vue({
      el: app,
      store,
      mixins: [mixinRoot],
    });
  }
});
;

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
});;

window.addEventListener("load", function() {
	Vue.component('site-header', {
		data: function () {
			return {
				visible: true,
				inverted: false,
				visible_mobile: false,
                open: false
			}
		},
        props: {
            headercolor: String,
			headertext: String,
        },
		mounted () {
				if(window.matchMedia('(max-width: 520px)').matches)
				{
					this.visible_mobile = true; 
					this.$refs.stickyColor.style.backgroundColor = this.headercolor;
				}

				if(this.headercolor != "" && this.headercolor != 'transparent' && (this.visible_mobile || this.headertext != '')){
					document.getElementById("blocks").style.paddingTop = "60px";
				}

				ScrollTrigger.create({
					trigger: ".page",
					start: "top top",
					onUpdate: self => {
						if(window.matchMedia('(max-width: 520px)').matches)
						{
							this.visible_mobile = true; 
							this.$refs.stickyColor.style.backgroundColor = this.headercolor;
						}
						else{
							let progress = self.progress.toFixed(3);
							this.visible_mobile = progress > 0 && progress < 100 && window.scrollY >= 100;
							this.visible = progress >= 0 && progress < 100 && window.scrollY < 100;

                        	if(this.visible_mobile)
                        	{
                        	    this.$refs.stickyColor.style.backgroundColor = this.headercolor;
                        	} else
                        	{
                        	    this.$refs.stickyColor.style.backgroundColor = "transparent";
                        	}
						}
					}
				});

/*
				ScrollTrigger.create({
					trigger: ".logo-inverted",
					start: "center center",
					onUpdate: self => {
						let progress = self.progress.toFixed(3);
						this.inverted = progress > 0 && progress < 100;
					}
				});
				*/
			 
		}
	});

	var app2 = document.getElementById("site-header");
	if(app2)
	{
		new Vue({
			el: app2,
			store,
			mixins: [mixinRoot]
		})
	}
});;

;

;

Vue.component('accessibility-controller', {
	data: () => ({
		hasClick: false,
		body : null
	}),
	methods: {
		clickHandlerAdd()
		{
			if(this.hasClick)
				return;

			this.hasClick = true;
			this.body.classList.add("tabbing");
			this.body = document.getElementsByTagName("body")[0];
			this.body.addEventListener("mousedown", this.clickHandler);
			this.body.addEventListener("touchstart", this.clickHandler);
		},

		clickHandlerRemove()
		{
			this.hasClick = false;
			this.body.classList.remove("tabbing");
			this.body.removeEventListener("touchstart", this.clickHandler);
			this.body.removeEventListener("mousedown", this.clickHandler);
		},

		clickHandler()
		{
			this.clickHandlerRemove();
		},

		tabHandler()
		{
			document.addEventListener("keydown", (event) =>
			{
				if (event.key === "Tab")
				{
					this.clickHandlerAdd();
				}
			});
		},
	},

	mounted () {
		this.body = document.getElementsByTagName("body")[0];
		this.tabHandler();
	},

	template: '<div></div>',
});;

Vue.component('lazy-media', {
	mixins: [mixinViewport],

	data: function () {
		return {
			loaded: false,
			autoplayPlaying : false,
			externalPlaying : false,
			brightnessValue : 0,
			isPaused : false
		}
	},

	computed: {
		srcset: function () {

			let sizes = [];
			for (let size in this.sizes)
			{
				sizes.push([this.sizes[size], this.sizes[size].width]);
			}

			sizes.sort(function(a, b) { return a[1] - b[1] });

			return sizes;
		},
		isVideo: function ()
		{
			return (!!this.video && this.video.length > 1) || (!!this.youtube && this.youtube.length > 1);
		},
		needsDarkening: function ()
		{
			return (!this.isVideo && this.brightnessValue <= 100 && this.brightnessValue > 0);
		},

		isAutoplay: function ()
		{
			return !!this.autoplay && this.autoplay.length > 1;
		}
	},

	props: {
		sizes: Object,
		path: String,
		video: String,
		autoplay: String,
		youtube: String,
		youtubelabel : String,
		brightness : Number,
		alt : String,
		crop: Object,
		background: Boolean,
		inline: Boolean,
		scale : Number,
		ratio: Number
	},

	methods: {
		scroll()
		{
			if(this.isVisibleHeightOnly(this.$refs.view))
			{
				if(!!this.autoplay)
				{
					this.load();

					if(!this.autoplayPlaying)
						this.autoplayPlay();
				}
				else
				{
					//this.scrollListenKill(this.scroll);
					this.animationFrameListenKill(this.scroll);
					this.load();
				}
			}
			else
			{
				if(this.autoplayPlaying)
				{
					this.autoplayStop();

					this.$refs.autoplay.pause();
					this.autoplayPlaying = false;
				}
			}
		},

		load: function ()
		{
			let image = null;

			const bounds = this.viewport(this.$el);

			let w = bounds.w;
			let src = null;
			const l = this.srcset.length;

			if(this.$root.retina)
			{
				w *= 1.5;
			}

			if(this.scale !== undefined && !isNaN(this.scale) && this.scale > 1)
				w *= this.scale;

			if(this.background)
			{
				image = new Image();

				image.onload = () =>
				{
					this.loaded = true;
					if (!!this.$el.parentElement) this.$el.parentElement.classList.add("lazy-media-loaded");

					if(!!this.$refs.background)
					{
						this.$refs.background.style = "background-image:url('" + image.src + "')";

						if (this.crop)
						{
							var x = 50;
							var y = 50;

							if (typeof this.crop === "object" && this.crop.left !== null)
								x = this.crop.left;

							if (typeof this.crop === "object" && this.crop.top !== null)
								y = this.crop.top;
						}

						this.$refs.background.style = "background-image:url('" + image.src + "'); background-position-x:" + x + "%; background-position-y:" + y + "%;";
					}

				};
			}
			else
			{
				image = this.$refs.image;

				image.onload = () =>
				{
					this.loaded = true;
					if (!!this.$el.parentElement) this.$el.parentElement.classList.add("lazy-media-loaded");
				};
			}


			src = '';
			for (let i = l - 1; i > -1; i--)
			{
				if (w < this.srcset[i][1])
				{

					if (this.srcset[i][0].url)
					{
						src = '';
					}
					else
					{
						src = this.srcset[i][0].file;
					}
				}
			}

			if (src === '')
				src = this.srcset[l - 1][0].file;

			if (src === undefined || src === null)
			{
				src = '';
			}

			//console.log("WIDTH:",bounds.w,"LOAD_WIDTH:",w,"SCALE:",this.scale,"RETINA:",this.$root.retina,"FILE:",src);
			image.src = this.path + src;
		},

		autoplayPlay()
		{
			if(!this.isPaused)
			{
				if(!this.autoplayPlaying)
				{
					this.$refs.autoplay.play();
					this.autoplayPlaying = true;
				}
			}
		},

		play()
		{
			this.isPaused = false;
			this.autoplayPlay();
		},

		pause()
		{
			this.isPaused = true;
			this.autoplayStop();
		},

		autoplayStop()
		{
			if(this.autoplayPlaying)
			{
				this.$refs.autoplay.pause();
				this.autoplayPlaying = false;
			}
		},

		videoYoutube()
		{
			try
			{
				while (this.$refs.externalView.firstChild) {
					this.$refs.externalView.removeChild(this.$refs.externalView.firstChild);
				}

				let videoUrl = this.youtube;

				if(this.youtube.indexOf("youtube") > 0)
				{
					let video_id = this.youtube.split('v=')[1];

					let pos = video_id.indexOf('&');

					if(pos !== -1)
						video_id = video_id.substring(0, pos);

					videoUrl = "https://www.youtube-nocookie.com/embed/"+video_id+"?showinfo=0&autoplay=1&autohide=1&rel=0&color=white";
				}
				else
				{
					videoUrl = this.youtube;
				}

				this.$refs.externalView.innerHTML = '<iframe src="'+videoUrl+'" type="text/html" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			}
			catch(e)
			{

			}
		},

		videoFile()
		{
			try
			{
				while (this.$refs.externalView.firstChild) {
					this.$refs.externalView.removeChild(this.$refs.externalView.firstChild);
				}

				this.$refs.externalView.innerHTML = '<video autoplay="autoplay" controls="controls" preload="preload"><source type="video/mp4" src="'+this.video+'" /></video>';
			}
			catch(e)
			{

			}
		},

		videoClear()
		{
			try
			{
				while (this.$refs.externalView.firstChild) {
					this.$refs.externalView.removeChild(this.$refs.externalView.firstChild);
				}

				this.$refs.externalView.innerHTML = '';
			}
			catch(e)
			{

			}
		},

		videoPlay()
		{
			//console.log("video-play!");

			if(this.externalPlaying)
				return;

			if(!!this.youtube && this.youtube.length > 0)
			{
				this.videoYoutube();
			}
			else if(!!this.video && this.video.length > 0)
			{
				this.videoFile();
			}

			TweenLite.killTweensOf([this.$refs.externalPlay,this.$refs.externalView,this.$refs.externalClose]);
			TweenLite.to(this.$refs.externalPlay,1.3,{display:"none",autoAlpha:0,delay:0,ease:Expo.easeOut});
			TweenLite.to(this.$refs.externalView,1.3,{display:"block",autoAlpha:1,delay:.2,ease:Expo.easeOut});
			TweenLite.to(this.$refs.externalClose,1.3,{display:"block",autoAlpha:1,delay:.4,ease:Expo.easeOut});

			this.externalPlaying = true;
		},

		videoStop()
		{
			if(!this.externalPlaying)
				return;

			TweenLite.killTweensOf([this.$refs.externalView,this.$refs.externalClose]);
			TweenLite.to([this.$refs.externalView,this.$refs.externalClose],.6,{display:"none",autoAlpha:0,ease:Expo.easeOut,onComplete:this.videoClear});
			TweenLite.to(this.$refs.externalPlay,0.6,{display:"block",autoAlpha:1,delay:.1,ease:Expo.easeOut});
			this.externalPlaying = false;
		},

		loadedmetadataHandler(event)
		{
			if(this.isVisibleHeightOnly(this.$refs.view))
			{
				this.autoplayPlay();
			}

			this.$refs.autoplay.removeEventListener('loadedmetadata',this.loadedmetadataHandler);
		},
	},

	beforeDestroy()
	{
		this.animationFrameListenKill(this.scroll);
		//this.scrollListenKill(this.scroll);
		this.videoClear();
		if(this.autoplay)
		{
			this.$refs.autoplay.removeEventListener('loadedmetadata', this.loadedmetadataHandler);
		}
	},

	mounted() {
		this.brightnessValue = 1 - this.brightness;

		if(this.isVisibleHeightOnly(this.$refs.view))
		{
			this.load();

			if(this.autoplay)
			{
				this.$refs.autoplay.addEventListener('loadedmetadata',this.loadedmetadataHandler);

				//	this.autoplayPlay();
				this.animationFrameListen(this.scroll);
				//this.scrollListen(this.scroll);
			}
		}
		else
		{
			this.animationFrameListen(this.scroll);
			//this.scrollListen(this.scroll);
		}
	},

	template: '#lazy-media',
});;

Vue.component('modal', {
	props: {
		closebtn: {
			type: Boolean,
			default: true
		},

		fullWidth : {
			type: Boolean,
			default: true
		},
	},
    methods: {
        close(event) {
            if(event.target===this.$refs.bg || event.target===this.$refs.close)
            {
                this.$parent.close();
            }
        }
    },

	template: '#modal',
});
;

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
});;

;

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
});;

class ParallaxMotionItem
{
	constructor(node) {
		this.node = node;
		this.data = JSON.parse(node.getAttribute("data-parallax"));
		this.view = this.node.querySelector(this.data.child);
		this.mask = this.node.querySelector(this.data.mask);
		this.breakpoint = {mobile: true, tablet: true, desktop: true};
		this.inited = false;
		this.inViewport = false;
		this.tweenFull = null;
		this.tweenIn = null;
		this.tweenCenter = null;
		this.tweenOut = null;
		this.masking = false;

		if(!!this.data.breakpoint)
		{
			this.breakpoint = {mobile: false, tablet: false, desktop: false};

			if(this.data.breakpoint.mobile)
				this.breakpoint.mobile = true;

			if(this.data.breakpoint.tablet)
				this.breakpoint.tablet = true;

			if(this.data.breakpoint.desktop)
				this.breakpoint.desktop = true;
		}

		if(!!this.data.masking)
		{
			this.masking = this.data.masking;
		}

		this.inited = (this.view && this.mask);

		if(!this.inited)
			return;

		if(!!this.data.in)
		{
			this.tweenIn = this.setupTween(this.data.in);
		}

		if(!!this.data.center)
		{
			this.tweenCenter = this.setupTween(this.data.center);
		}

		if(!!this.data.out)
		{
			this.tweenOut = this.setupTween(this.data.out,true);
		}

		if(!!this.data.full)
		{
			this.tweenFull = this.setupTween(this.data.full);
		}

		if(!!this.masking)
		{
			this.maskWrap(this.view);
		}

		gsap.set(this.view, {willChange: "transform,opacity",transformStyle: "preserve-3d"});
	};

	setupTween(data,flipped = false,easing = 'none')
	{
		const tween = gsap.timeline({paused:true});

		const from = {};
		const to = {};

		for (const p in data)
		{
			if(data.hasOwnProperty(p))
			{
				if(p !== "ease")
				{
					const v = data[p];
					from[p] = v[0];
					to[p] = v[1];

					if(flipped)
					{
						from[p] = v[1];
						to[p] = v[0];
					}
				}
			}
		}

		if(data.ease && easing === 'none')
		{
			to.ease = data.ease;
		}
		else
			to.ease = easing;

		to.duration = 1;
		tween.immediateRender = false;
		tween.fromTo(this.view, from,to);
		return tween;
	}

	init()
	{
		if(!this.inViewport)
		{
			this.inViewport = true;
		}
	}

	translate(p)
	{
		let percent = p;

		if(this.tweenFull)
		{
			this.tweenFull.progress(percent);
		}
		else
		{
			if(p <= .25)
			{
				if(this.tweenIn)
				{
					percent = p * 4;
					this.tweenIn.progress(percent);
				}
			}
			else if(p >= .25 && p <=.5)
			{
				if (this.tweenCenter)
				{
					percent = (p - .25) * 4;
					this.tweenCenter.progress(percent);
				}
			}
			else if(p >= .75)
			{
				if (this.tweenOut)
				{
					percent = (1 - p) * 4;
					this.tweenOut.progress(percent);
				}
			}
		}
	}

	maskWrap(el)
	{
		try
		{
			const wrapper = document.createElement('div');
			wrapper.className = 'parallax-stagger-mask';
			el.parentNode.insertBefore(wrapper, el);
			wrapper.appendChild(el);
		}
		catch (e)
		{
			console.log("ERROR:",el);
		}
	}

	destroy()
	{
		if(this.inViewport)
		{
			this.inViewport = false;
			//TweenLite.set(this.view,{willChange:"auto"});
		}
	}
}
;

class ParallaxStaggerItem
{
	constructor(node) {
		this.node = node;
		this.data = JSON.parse(node.getAttribute("data-parallax-stagger"));
		this.viewSet = null;
		this.mask = this.node.querySelector(this.data.mask);
		this.breakpoint = {mobile: true, tablet: true, desktop: true};
		this.inited = false;
		this.inViewport = false;
		this.tweenFull = null;
		this.tweenIn = null;
		this.tweenCenter = null;
		this.tweenOut = null;
		this.split = false;
		this.masking = false;

		if(this.data.hasOwnProperty("split"))
		{
			this.split = this.data.split;
		}

		if(!!this.data.breakpoint)
		{
			this.breakpoint = {mobile: false, tablet: false, desktop: false};

			if(this.data.breakpoint.mobile)
				this.breakpoint.mobile = true;

			if(this.data.breakpoint.tablet)
				this.breakpoint.tablet = true;

			if(this.data.breakpoint.desktop)
				this.breakpoint.desktop = true;
		}

		if(!!this.data.masking)
		{
			this.masking = this.data.masking;
		}

		switch (this.split)
		{
			case "lines":
				const child = this.node.querySelector(this.data.child);
				const splitText = new SplitText(child, {type:"lines",linesClass:"data-motion-text"});
				this.viewSet = splitText.lines;
				break;
			case "chars":
				break;
			case false:
				this.viewSet = this.node.querySelectorAll(this.data.child);
				break;
		}

		this.inited = (this.viewSet && this.mask);

		if(!this.inited)
			return;

		if(!!this.masking)
		{
			for(let i = 0; i < this.viewSet.length;i++)
			{
				this.maskWrap(this.viewSet[i]);
			}
		}

		if(!!this.data.in)
		{
			this.tweenIn = this.setupTween(this.data.in);
		}

		if(!!this.data.center)
		{
			this.tweenCenter = this.setupTween(this.data.center);
		}

		if(!!this.data.out)
		{
			this.tweenOut = this.setupTween(this.data.out,true);
		}

		if(!!this.data.full)
		{
			this.tweenFull = this.setupTween(this.data.full);
		}

		gsap.set(this.viewSet,{willChange: "transform,opacity",transformStyle: "preserve-3d"});
	};

	setupTween(data,flipped = false,easing = 'none')
	{
		const tweens = [];

		for(let i = 0; i < this.viewSet.length;i++)
		{
			const tween = gsap.timeline({paused:true});
			const from = {};
			const to = {};

			for (const p in data)
			{
				if(data.hasOwnProperty(p))
				{
					if(p !== "ease" && p!=="delay")
					{
						const v = data[p];
						from[p] = v[0]+(v[0]*((i)*data.delay));
						to[p] = v[1];

						if(flipped)
						{
							from[p] = v[0];
							to[p] = v[1]+(v[1]*((i)*data.delay));
						}
					}
				}
			}

			if(data.ease && easing === 'none')
			{
				to.ease = data.ease;
			}
			else
				to.ease = easing;

			to.duration = 1;
			tween.immediateRender = false;
			tween.fromTo(this.viewSet[i], from,to);
			tweens.push(tween);
		}


		return tweens;
	}

	translate(p)
	{
		let percent = p;

		if(this.tweenFull)
		{
			for(let i = 0; i < this.viewSet.length;i++)
				this.tweenFull[i].progress(percent);
		}
		else
		{
			if(p <= .25)
			{
				if(this.tweenIn)
				{
					percent = p * 4;
					for(let i = 0; i < this.viewSet.length;i++)
						this.tweenIn[i].progress(percent);
				}
			}
			else if(p >= .25 && p <=.5)
			{
				if (this.tweenCenter)
				{
					percent = (p - .25) * 4;

					for(let i = 0; i < this.viewSet.length;i++)
						this.tweenCenter[i].progress(percent);

				}
			}
			else if(p >= .75)
			{
				if (this.tweenOut)
				{
					percent = 1-((1 - p) * 4);

					for(let i = 0; i < this.viewSet.length;i++)
						this.tweenOut[i].progress(percent);
				}
			}
		}
	}


	init()
	{
		if(!this.inViewport)
		{
			this.inViewport = true;
		}
	}

	maskWrap(el)
	{
		try
		{
			const wrapper = document.createElement('div');
			wrapper.className = 'parallax-stagger-mask';
			el.parentNode.insertBefore(wrapper, el);
			wrapper.appendChild(el);
		}
		catch (e)
		{
			console.log("ERROR:",el);
		}
	}

	destroy()
	{
		if(this.inViewport)
		{
			this.inViewport = false;
			//TweenLite.set(this.view,{willChange:"auto"});
		}
	}
}
;

const share = Vue.component('share', {
    data() {
        return {
            title: document.querySelector("meta[property='og:site_name']").getAttribute("content"),
            text: document.querySelector("meta[property='og:title']").getAttribute("content"),
            url: document.querySelector("meta[property='og:url']").getAttribute("content"),
            image: document.querySelector("meta[property='og:image']").getAttribute("content")
        }
    },
    props: {
        ismodalvisible: Boolean
    },

    watch: {
        ismodalvisible: function(n, o) {

            /* if (n && this.share()) {
               this.$emit('close');
             }*/
        }
    },

    mounted() {

        //trigger close with esc
        let self = this;


        /*window.addEventListener('keyup', function(event) {
            if (event.keyCode === 27) {
              self.$emit('close');
            }
        });


        document.getElementsByClassName('modal-backdrop')[0].addEventListener('click', function(event) {
          setTimeout(function() {self.$emit('close');}, 200);
        });*/

    },

    methods: {

        open() {
            console.log("OPEN!");
        },


        share() {
            if (navigator.share) {
                navigator.share({
                        title: this.title,
                        text: this.text,
                        url: this.url
                    }).then(() => {
                        this.$emit('close');
                    })
                    .catch(err => {
                        return false;
                    });
            } else {
                return false;
            }
        },
        copyToClipboard() {
            let copyText = document.getElementById("urlToCopy");
            copyText.value = this.url;
            copyText.select();
            document.execCommand("copy");

            this.$emit('close');
        },
        shareWithFacebook() {
            url = this.url;

            var shareString = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);

            var w = 980;
            var h = 500;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);

            window.open(shareString, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no,height=' + h + ',width=' + w + ',top=' + top + ', left=' + left + '');

            this.$emit('close');
        },

        shareWithInstagram() {

            //download image -- there is no instagram sharer
            var link = document.createElement("a");
            link.download = this.title;
            link.href = this.image;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;

            setTimeout(function() { location.href = "https://www.instagram.com/" }, 1500);
        },

        shareWithTwitter() {
            text = this.text;
            url = this.url;

            var shareString = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text);

            var w = 980;
            var h = 500;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);

            window.open(shareString, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no,height=' + h + ',width=' + w + ',top=' + top + ', left=' + left + '');

            this.$emit('close');
        },
        shareViaEmail() {
            title = this.title;
            text = this.text;
            url = this.url;
            window.location.href = "mailto:?to=&subject=" + title + '&body=' + text + '%0D%0A' + '%0D%0A' + encodeURIComponent(url);

            this.$emit('close');
        }
    },
    template: '#share',
});;

Vue.component('teaser-lane-with-buttons', {
	data: function () {
		return {
			teaserLane: null,
			visiblePrev : false,
			visibleNext : false
		}
	},
	computed: {

	},
	methods: {
		scrollHandler(event)
		{

			TweenLite.killDelayedCallsTo(this.check);
			TweenLite.delayedCall(.5,this.check);
		},

		check()
		{
			const padding = 20;
			this.visiblePrev = this.teaserLane.scrollLeft > padding;
			this.visibleNext = this.teaserLane.scrollLeft + this.teaserLane.offsetWidth + padding < this.teaserLane.scrollWidth;
		},

		prev()
		{
			var scrolldistance = document.getElementsByClassName('row')[0].offsetWidth;
			this.teaserLane.scrollTo({
				left: this.teaserLane.scrollLeft-scrolldistance,
				top: 0,
				behavior: 'smooth'
			});
		},

		next()
		{
			var scrolldistance = document.getElementsByClassName('row')[0].offsetWidth;
			this.teaserLane.scrollTo({
				left: this.teaserLane.scrollLeft+scrolldistance,
				top: 0,
				behavior: 'smooth'
			});
		}
	},
	mounted() {
		this.teaserLane = this.$el.querySelector(".teaser-lane");
		this.teaserLane.addEventListener('scroll', this.scrollHandler,{capture: true, passive: true});
		this.check();
	},
	template: '#teaser-lane-with-buttons'
});;

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
});;

Vue.filter('formatDate', function(value) {
	if (value) {
		if(window.lang === "de")
			return moment(String(value)).format('D. MMMM');
		else
			return moment(String(value)).format('D MMMM');
	}
});


Vue.filter('formatTime', function(value) {
	if (value) {
		if(window.lang === "en")
			return moment(String(value),[moment.ISO_8601, 'HH:mm']).format("hh:mm A")
		else
			return value;
	}
});

Vue.filter('formatTimeEnd', function(value) {
	if (value) {
		if(window.lang === "en")
			return moment(String(value),[moment.ISO_8601, 'HH:mm']).format("hh:mm A")
		else
			return value+" Uhr";
	}
});

Vue.filter('trim', function(value) {
	if (value) {
		return value.trim();
	}
});

Vue.filter('formatDay', function(value) {
	if (value) {
		return moment(String(value)).format('dddd')
	}
});

Vue.filter('formatEvent', function(value) {
	if (value) {
		return moment(String(value)).format('dd D.MM.')
	}
});

Vue.filter('formatEventLong', function(value) {
	if (value) {
		if(window.lang === "en")
			return moment(String(value)).format('D MMMM');
		else
			return moment(String(value)).format('dddd, D.MM.');
	}
});


Vue.filter('secondsAsTime',function(secs)
{
	var hr  = Math.floor(secs / 3600);
	var min = Math.floor((secs - (hr * 3600))/60);
	var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec  = "0" + sec;
	}
	return min + ':' + sec;
});;

const routes = [];
const router = new VueRouter({
	mode: 'history',
	hashbang: true,
	routes
});

window.router = router;;

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
};;

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