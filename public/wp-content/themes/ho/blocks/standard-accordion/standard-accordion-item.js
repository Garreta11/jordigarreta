window.addEventListener("DOMContentLoaded", () => {
	Vue.component('block-accordion-item', {
		data: function () {
			return {
				active:false
			}
		},

		methods: {
			key(event)
			{
				const key = event.which.toString();

				if (key.match(/38|40/) || (key.match(/33|34/)))
				{
					event.preventDefault();

					var direction = (key.match(/34|40/)) ? 1 : -1;

					if(direction > 0)
						this.$parent.next(this);
					else
						this.$parent.prev(this);
				}
			},

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

			focus()
			{
				this.$refs.head.focus();
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

			openComplete()
			{
				TweenLite.set(this.$refs.body,{overflow:"visible",height:"auto",display:"block"});
			},

			close()
			{
				this.active = false;

				TweenLite.killTweensOf(this.$refs.body);
				TweenLite.set(this.$refs.body,{overflow:"hidden",display:"block",height:this.$refs.body.scrollHeight});
				TweenLite.to(this.$refs.body,.8,{height:0,ease:Expo.easeOut,onComplete:this.closeComplete});
			},

			closeComplete()
			{
				TweenLite.set(this.$refs.body,{overflow:"hidden",height:0,display:"none"});
			},

			handleHistoryChange () {
				if (window.location.hash == '#'+this.$refs.item.getAttribute("data-id")) {
					this.open(false);

					let margin = 60;
					TweenLite.to(window, .8, {scrollTo:{y:this.$refs.item,offsetY:margin,autoKill: false},delay:.01,ease:Expo.easeOut});
				}
			}
		},

		mounted () {
		   this.$refs.item.classList.remove("vue-initialize");
		   this.active = this.$refs.item.classList.contains("active");

			if(this.active)
				this.openComplete();

			//handle url hash parameter to open from outside
			this.handleHistoryChange();
			window.addEventListener('popstate', this.handleHistoryChange);
		},
		destroyed () {
			window.removeEventListener('popstate', this.handleHistoryChange);
		}
	});
});