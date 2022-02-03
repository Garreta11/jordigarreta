class ParallaxMotionItem
{
	constructor(node) {
		this.node = node;
		this.data = JSON.parse(node.getAttribute("data-parallax"));
		this.view = this.node.querySelector(this.data.child);
		this.mask = this.node.querySelector(this.data.mask);
		this.breakpoint = {mobile: true, tablet: true, desktop: true};
		this.inited = false;
		this.inViewport = false;
		this.tweenFull = null;
		this.tweenIn = null;
		this.tweenCenter = null;
		this.tweenOut = null;
		this.masking = false;

		if(!!this.data.breakpoint)
		{
			this.breakpoint = {mobile: false, tablet: false, desktop: false};

			if(this.data.breakpoint.mobile)
				this.breakpoint.mobile = true;

			if(this.data.breakpoint.tablet)
				this.breakpoint.tablet = true;

			if(this.data.breakpoint.desktop)
				this.breakpoint.desktop = true;
		}

		if(!!this.data.masking)
		{
			this.masking = this.data.masking;
		}

		this.inited = (this.view && this.mask);

		if(!this.inited)
			return;

		if(!!this.data.in)
		{
			this.tweenIn = this.setupTween(this.data.in);
		}

		if(!!this.data.center)
		{
			this.tweenCenter = this.setupTween(this.data.center);
		}

		if(!!this.data.out)
		{
			this.tweenOut = this.setupTween(this.data.out,true);
		}

		if(!!this.data.full)
		{
			this.tweenFull = this.setupTween(this.data.full);
		}

		if(!!this.masking)
		{
			this.maskWrap(this.view);
		}

		gsap.set(this.view, {willChange: "transform,opacity",transformStyle: "preserve-3d"});
	};

	setupTween(data,flipped = false,easing = 'none')
	{
		const tween = gsap.timeline({paused:true});

		const from = {};
		const to = {};

		for (const p in data)
		{
			if(data.hasOwnProperty(p))
			{
				if(p !== "ease")
				{
					const v = data[p];
					from[p] = v[0];
					to[p] = v[1];

					if(flipped)
					{
						from[p] = v[1];
						to[p] = v[0];
					}
				}
			}
		}

		if(data.ease && easing === 'none')
		{
			to.ease = data.ease;
		}
		else
			to.ease = easing;

		to.duration = 1;
		tween.immediateRender = false;
		tween.fromTo(this.view, from,to);
		return tween;
	}

	init()
	{
		if(!this.inViewport)
		{
			this.inViewport = true;
		}
	}

	translate(p)
	{
		let percent = p;

		if(this.tweenFull)
		{
			this.tweenFull.progress(percent);
		}
		else
		{
			if(p <= .25)
			{
				if(this.tweenIn)
				{
					percent = p * 4;
					this.tweenIn.progress(percent);
				}
			}
			else if(p >= .25 && p <=.5)
			{
				if (this.tweenCenter)
				{
					percent = (p - .25) * 4;
					this.tweenCenter.progress(percent);
				}
			}
			else if(p >= .75)
			{
				if (this.tweenOut)
				{
					percent = (1 - p) * 4;
					this.tweenOut.progress(percent);
				}
			}
		}
	}

	maskWrap(el)
	{
		try
		{
			const wrapper = document.createElement('div');
			wrapper.className = 'parallax-stagger-mask';
			el.parentNode.insertBefore(wrapper, el);
			wrapper.appendChild(el);
		}
		catch (e)
		{
			console.log("ERROR:",el);
		}
	}

	destroy()
	{
		if(this.inViewport)
		{
			this.inViewport = false;
			//TweenLite.set(this.view,{willChange:"auto"});
		}
	}
}
