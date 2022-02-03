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
});