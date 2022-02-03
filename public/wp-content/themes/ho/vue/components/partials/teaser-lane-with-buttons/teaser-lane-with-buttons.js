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
});