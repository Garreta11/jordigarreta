class ParallaxStaggerItem
{
	constructor(node) {
		this.node = node;
		this.data = JSON.parse(node.getAttribute("data-parallax-stagger"));
		this.viewSet = null;
		this.mask = this.node.querySelector(this.data.mask);
		this.breakpoint = {mobile: true, tablet: true, desktop: true};
		this.inited = false;
		this.inViewport = false;
		this.tweenFull = null;
		this.tweenIn = null;
		this.tweenCenter = null;
		this.tweenOut = null;
		this.split = false;
		this.masking = false;

		if(this.data.hasOwnProperty("split"))
		{
			this.split = this.data.split;
		}

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

		switch (this.split)
		{
			case "lines":
				const child = this.node.querySelector(this.data.child);
				const splitText = new SplitText(child, {type:"lines",linesClass:"data-motion-text"});
				this.viewSet = splitText.lines;
				break;
			case "chars":
				break;
			case false:
				this.viewSet = this.node.querySelectorAll(this.data.child);
				break;
		}

		this.inited = (this.viewSet && this.mask);

		if(!this.inited)
			return;

		if(!!this.masking)
		{
			for(let i = 0; i < this.viewSet.length;i++)
			{
				this.maskWrap(this.viewSet[i]);
			}
		}

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

		gsap.set(this.viewSet,{willChange: "transform,opacity",transformStyle: "preserve-3d"});
	};

	setupTween(data,flipped = false,easing = 'none')
	{
		const tweens = [];

		for(let i = 0; i < this.viewSet.length;i++)
		{
			const tween = gsap.timeline({paused:true});
			const from = {};
			const to = {};

			for (const p in data)
			{
				if(data.hasOwnProperty(p))
				{
					if(p !== "ease" && p!=="delay")
					{
						const v = data[p];
						from[p] = v[0]+(v[0]*((i)*data.delay));
						to[p] = v[1];

						if(flipped)
						{
							from[p] = v[0];
							to[p] = v[1]+(v[1]*((i)*data.delay));
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
			tween.fromTo(this.viewSet[i], from,to);
			tweens.push(tween);
		}


		return tweens;
	}

	translate(p)
	{
		let percent = p;

		if(this.tweenFull)
		{
			for(let i = 0; i < this.viewSet.length;i++)
				this.tweenFull[i].progress(percent);
		}
		else
		{
			if(p <= .25)
			{
				if(this.tweenIn)
				{
					percent = p * 4;
					for(let i = 0; i < this.viewSet.length;i++)
						this.tweenIn[i].progress(percent);
				}
			}
			else if(p >= .25 && p <=.5)
			{
				if (this.tweenCenter)
				{
					percent = (p - .25) * 4;

					for(let i = 0; i < this.viewSet.length;i++)
						this.tweenCenter[i].progress(percent);

				}
			}
			else if(p >= .75)
			{
				if (this.tweenOut)
				{
					percent = 1-((1 - p) * 4);

					for(let i = 0; i < this.viewSet.length;i++)
						this.tweenOut[i].progress(percent);
				}
			}
		}
	}


	init()
	{
		if(!this.inViewport)
		{
			this.inViewport = true;
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
