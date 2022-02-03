window.addEventListener("DOMContentLoaded", () => {

	if (!(typeof VueAwesomeSwiper === 'undefined' || VueAwesomeSwiper === null)) {
		Vue.use(VueAwesomeSwiper);
	}

	Vue.component('block-header', {
		data: function () {
			return {
				sizes: null,
				path: null,
				alt: '',
				video: null,
				youtubelabel: '',
				autoplay: null,
				youtube: null,
				crop: null,
				brightness: 100,
				background: false,
				isOpen: false,
				scale: 1,

				hasMobileFormat: false,
				hasAudioDescription: false,
				audioDescription: '',


				scrollProgress: 0,

				slotStarted: true,
				slotRunning: true,

				currentImage: '',
				currentName: '',
				currentAuthor: '',
				currentText: '',

				interval: false,
				containerHeight: 500,
				containerWidth: 500,
				swiperoptions: {
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					},
					lazy: {
						loadPrevNext: true,
						loadPrevNextAmount: 2
					},

					autoplay: {
						delay: 500,
						waitForTransition: false
					},

					grabCursor: true,
					slidesPerView: 1,
					setWrapperSize: true,
					loop: true,
					centeredSlides: true,
					allowTouchMove: true,
					spaceBetween: 20,
				}
			}
		},
		computed: {
			breakPointIsMobile: function () {
				return store.getters['settings/breakPointIsMobile'];
			},
			breakPointIsTablet: function () {
				return store.getters['settings/breakPointIsTablet'];
			},
			scrollstarted: function () {
				return this.scrollProgress > 3
			}
		},
		methods: {
			toggle() {
				if (!this.isOpen) {
					this.open();
				} else {
					this.close();
				}
			},

			open() {
				this.isOpen = true;

				TweenLite.killTweensOf(this.$refs.body);
				TweenLite.set(this.$refs.body, {
					display: "block"
				});
				TweenLite.to(this.$refs.body, .8, {
					height: this.$refs.body.scrollHeight,
					ease: Expo.easeOut,
					onComplete: this.openComplete
				});
			},

			openComplete() {
				TweenLite.set(this.$refs.body, {
					overflow: "visible",
					height: "auto"
				});
			},

			close() {
				this.isOpen = false;

				TweenLite.killTweensOf(this.$refs.body);
				TweenLite.set(this.$refs.body, {
					overflow: "hidden",
					display: "block",
					height: this.$refs.body.scrollHeight
				});
				TweenLite.to(this.$refs.body, .8, {
					height: 0,
					ease: Expo.easeOut,
					onComplete: this.closeComplete
				});
			},

			closeComplete() {
				TweenLite.set(this.$refs.body, {
					overflow: "hidden",
					height: 0,
					display: "none"
				});
			},

			audioDescriptionPlay() {
				window.open(this.audioDescription, "_blank");
			},

			desktopView() {
				let data = JSON.parse(this.$refs.data.innerHTML);
				this.sizes = data.sizes_d;
				this.alt = data.alt_d;
				this.path = data.path_d;
				this.autoplay = data.autoplay_d;
				this.crop = data.crop_d;

				this.hasAudioDescription = false;

				if (this.autoplay && data.has_ad)
					this.hasAudioDescription = data.has_ad;

				if (!!data.scale_d && !isNaN(data.scale_d) && data.scale_d > 1) {
					this.scale = data.scale_d;
				}
			},

			mobileView() {
				let data = JSON.parse(this.$refs.data.innerHTML);

				if (this.hasMobileFormat) {
					this.sizes = data.sizes_m;
					this.alt = data.alt_m;
					this.path = data.path_m;
					this.autoplay = data.autoplay_m;
					this.crop = data.crop_m;

					if (!!data.scale_m && !isNaN(data.scale_m) && data.scale_m > 1) {
						this.scale = data.scale_m;
					}
				} else {
					this.sizes = data.sizes_d;
					this.alt = data.alt_d;
					this.path = data.path_d;
					this.autoplay = data.autoplay_d;
					this.crop = data.crop_d;

					if (!!data.scale_d && !isNaN(data.scale_d) && data.scale_d > 1) {
						this.scale = data.scale_d;
					}
				}

				this.hasAudioDescription = false;

				if (this.autoplay && data.has_ad)
					this.hasAudioDescription = data.has_ad;
			},

			scrollConstruct() {
				gsap.registerPlugin(ScrollTrigger);

				//block-slotmachine-logo
				if (this.$refs.squeezer) {

					var self = this;

					/* BG IMAGE SQEEEZE */
					gsap.to(this.$refs.squeezer, {
						scrollTrigger: {
							trigger: ".block-header-slotmachine",
							toggleActions: 'restart pause none reverse',
							start: 'center center',
							onUpdate: function (data) {
								self.scrollProgress = data.progress.toFixed(3) * 100;
							},
							toggleClass: 'trigger-active'
						},

						duration: 0.3,
						scale: 0,
						opacity: 0,
						xPercent: 5
					});

					/* LOGO SCROLL UP */
					gsap.to('.block-slotmachine-logo', {
						scrollTrigger: {
							trigger: ".block-header-slotmachine-trigger",
							toggleActions: 'restart pause none reverse',
							start: '22% bottom',
							scrub: true

						},

						y: -1 * window.innerHeight
					});

					/* SCROLL DOWN TEASER */
					var duration = 1;
					bounce_obj = '.block-slotmachine-scrolldown';
					var tl = new TimelineMax({
						repeat: -1,
						repeatDelay: 5
					});
					tl.set(bounce_obj, {
							y: 0
						})
						.to(bounce_obj, duration / 4, {
							y: -25,
							ease: Power2.easeOut
						}, "bounceme")
						.to(bounce_obj, duration / 2, {
							y: 10,
							ease: Bounce.easeOut,
							delay: duration / 4
						}, "bounceme");

					/*
				
				gsap.to("#squeezer", {
					scrollTrigger: {
						trigger: ".block-header-slotmachine",
						toggleClass: "block-header-scrollTrigger",
						toggleActions: 'play play reverse pause',
						start: 'center center',
						endTrigger: '.block-vbu',
						scrub: true,
						pin: true,
						markers: true,
						onUpdate: function (data) {
							self.scrollProgress = data.progress*100;
						}
					},
				
					scale: 0,
					opacity: 0,
					xPercent: 5,
					onComplete: function () {
						self.scrollProgress = 100;
					}
				});
*/
				}

				/*
				
					gsap.to(this.$refs.squeezer, {
						scrollTrigger: {
							trigger: ".block-header-slotmachine",
							toggleClass: "block-header-scrollTrigger",
							toggleActions: 'play pause reverse reverse',
							start: 'center center',
							markers: true
						},
					
						scale: 0,
						opacity: 0,
						xPercent: 5
					});
				*/

				/*
				gsap.to("#squeezer", {
					scrollTrigger: {
						trigger: ".block-header-slotmachine",
						toggleClass: "block-header-scrollTrigger",
						toggleActions: 'play play reverse pause',
						start: 'center center',
						endTrigger: '.block-vbu',
						scrub: true,
						pin: true,
						markers: true
					},
				
					scale: 0,
					opacity: 0,
					xPercent: 5,
					onComplete: function () {
						console.log('heööp');
					}
				});
				*/
			},


			start() {


				if (!this.interval) {
					this.interval = setInterval(() => {
						this.slotRunning = false;

						this.$refs.swiper.swiper.autoplay.stop();

						this.currentImage = this.$refs.swiper.$el.querySelector('.swiper-slide-active img').getAttribute('src')
						this.currentName = this.$refs.swiper.$el.querySelector('.swiper-slide-active img').getAttribute('alt');
						this.currentAuthor = this.$refs.swiper.$el.querySelector('.swiper-slide-active img').getAttribute('data-author');
						this.currentText = this.$refs.swiper.$el.querySelector('.swiper-slide-active img').getAttribute('data-text');
					}, 300)
				}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
				this.slotRunning = true;
				this.$refs.swiper.swiper.autoplay.start();
			},
			resize() {
				this.containerHeight = this.$refs.container.clientHeight;
				this.containerWidth = this.$refs.container.clientWidth;
			}
		},

		mounted() {
			let data = JSON.parse(this.$refs.data.innerHTML);

			this.background = true;
			this.hasMobileFormat = data.has_mobile_format;
			this.hasAudioDescription = data.has_ad;
			this.audioDescription = data.audio_description_yt;

			if (data.brightness) {
				this.brightness = parseInt(data.brightness) / 100;
			}

			if (data.youtube) {
				this.youtube = data.youtube;
				this.youtubelabel = data.youtubelabel;
				this.video = data.video;
			}

			if (store.getters['settings/breakPointIsMobile']) {
				this.mobileView();
			} else {
				this.desktopView();
			}



			var _self = this;
			this.$store.watch(() => store.getters['settings/breakPointIsMobile'], (newValue, oldValue) => {
				if (newValue) {
					console.log('mobileView');
					_self.mobileView();
				} else {
					console.log('desktopView');
					_self.desktopView();
				}
			});


			if (this.$refs.swiper) {
				window.addEventListener('resize', () => this.$nextTick(this.resize()));
				this.resize();
			}

			this.scrollConstruct();
		}
	});
});