window.addEventListener("DOMContentLoaded", () =>
{
	Vue.component('block-gallery-item', {
		data: function ()
		{
			return {
				ratio : 0,
				style: {
					width: 0,
					height: 0,
				}
			}
		},

		props: {
			image : Object
		},

		methods: {
			resize()
			{
				let swiper = this.$el;
				let w = this.image.width;
				let h = this.image.height;
				let offsetWidth = swiper.offsetWidth;
				let offsetHeight = swiper.offsetHeight;

				let ratio = offsetHeight / h;

				if (ratio > 1)
					ratio = 1;

				if (w * ratio < offsetWidth)
				{
					this.style.width = parseInt(w * ratio) + "px";
					this.style.height = parseInt(offsetHeight) + "px";
				}
				else
				{
					ratio = offsetWidth / w;

					if (ratio > 1)
						ratio = 1;

					this.style.width = parseInt(offsetWidth) + "px";
					this.style.height = parseInt(h * ratio) + "px";
				}
			},
		},

		mounted()
		{
			window.addEventListener('resize', () => this.$nextTick(this.resize()));
			this.resize();
		}
	});
});