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
};