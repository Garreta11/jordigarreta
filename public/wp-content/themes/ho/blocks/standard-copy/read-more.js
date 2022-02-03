window.addEventListener("DOMContentLoaded", () => {

	Vue.component('read-more', {
		data: function () {
			return {
				active:false
			}
		},
		methods: {
			toggle()
			{
				if(!this.active)
				{
					this.open(true);
				}
				else
				{
					this.close();
				}
			},
			open (tween) {
				this.active = true;

				TweenLite.killTweensOf(this.$refs.body);
				TweenLite.set(this.$refs.body,{display:"block"});

				if(tween)
				{
					TweenLite.to(this.$refs.body,.8,{height:this.$refs.body.scrollHeight,ease:Expo.easeOut,onComplete:this.openComplete});
				}
				else
				{
					this.openComplete();
				}
			},
			close()
			{
				this.active = false;

				TweenLite.killTweensOf(this.$refs.body);
				TweenLite.set(this.$refs.body,{overflow:"hidden",display:"block",height:this.$refs.body.scrollHeight});
				TweenLite.to(this.$refs.body,.8,{height:0,ease:Expo.easeOut,onComplete:this.closeComplete});
			},

		}
	});
});