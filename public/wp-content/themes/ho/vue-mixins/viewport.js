var mixinViewport = {
	created : function () {
		this.frameBasedFunc = null;
	},

	methods: {
		/**
		 * GET ITEM POSITION AND SIZE
		 * @param el
		 * @returns {{t: number, w: number, h: number, l: number}|boolean}
		 */
		viewport(el)
		{
			if(!!el)
			{
				var rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				return {t: rect.top + scrollTop, l: rect.left + scrollLeft,x: rect.x, y:rect.y,w:rect.width,h:rect.height}
			}
			else
			{
				return false;
			}
		},

		/**
		 * IS ELEMENT COMPLETE VISIBLE IN VIEWPORT
		 * @param el
		 * @returns {boolean|boolean}
		 */
		isVisibleHeightOnly(el)
		{
			const item = this.viewport(el);
			const doc = document.documentElement;
			const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			const bottom = top + window.innerHeight;

			const left = 0;
			const right = left + window.innerWidth;

			const t = top - item.h;
			const b = bottom + item.h;
			const l = left - item.w;
			const r = right + item.w;

			const vH = (t < item.t && b > (item.t + item.h));
			const vW = (l < item.l && r > (item.x + item.w));

			if(vH)
			{
				if(vW)
					return true;
			}

			return false;
		},

		/**
		 * HAS USER SCROLLED OVER THE ITEM TOP POSITION
		 * @param el
		 * @returns {boolean|boolean}
		 */
		isSticky(el)
		{
			const item = this.viewport(el);
			const doc = document.documentElement;
			const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

			return (top >= item.t);
		},

		scrollListen(func)
		{
			var doc = window;

			console.log("scrollListen: ",this.$el);

			if(document.getElementsByClassName("interface-interface-skeleton__content").length > 0)
			{
				doc = document.getElementsByClassName("interface-interface-skeleton__content")[0];
			}

			if(window.smoothScroll)
			{
				window.smoothScroll.on('scroll', func);
			}
			else
			{
				doc.addEventListener('scroll', func,{passive: true});
			}
		},

		animationFrameListen(func)
		{
			console.log("animationFrameListen");
			this.frameBasedFunc = func;
			requestAnimationFrame(this.animationFrameUpdate);
		},

		animationFrameUpdate()
		{
			if(!!this.frameBasedFunc)
			{
				this.frameBasedFunc();
				requestAnimationFrame(this.animationFrameUpdate);
			}
		},

		animationFrameListenKill()
		{
			console.log("animationFrameListenKill");
			this.frameBasedFunc = null;
		},

		scrollListenKill(func)
		{
			var doc = window;

			if(document.getElementsByClassName("block-editor-editor-skeleton__content").length > 0)
			{
				doc = document.getElementsByClassName("block-editor-editor-skeleton__content")[0];
			}

			if(window.smoothScroll)
			{
				window.smoothScroll.off('scroll', func);
			}
			else
			{
				doc.removeEventListener('scroll', func,{passive: true});
			}
		}
	}
};