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
});