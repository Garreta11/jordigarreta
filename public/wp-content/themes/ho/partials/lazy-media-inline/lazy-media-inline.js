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
});