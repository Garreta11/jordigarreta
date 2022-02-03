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
});