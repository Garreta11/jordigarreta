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
});