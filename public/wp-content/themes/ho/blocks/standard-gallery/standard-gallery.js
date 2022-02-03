window.addEventListener("DOMContentLoaded", () => {

    if (!(typeof VueAwesomeSwiper === 'undefined' || VueAwesomeSwiper === null)) {
        Vue.use(VueAwesomeSwiper);
    }

    Vue.component('block-gallery', {
        mixins: [mixinViewport],

        data: () => {
            return {
                loaded : false,
                firstLoaded : false,
                images : null,
                first : null,

                options: {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    lazy: {
                        loadPrevNext : true,
                        loadPrevNextAmount : 2
                    },

                    grabCursor : true,
                    slidesPerView: 1,
                    setWrapperSize : true,
                    loop: false,
                    centeredSlides: true,
                    allowTouchMove: true,
                    spaceBetween: 20
                }
            }
        },
        methods : {
            setup()
            {
                let data = JSON.parse(this.$refs.data.innerHTML);
                let sizes;

                for(let i = 0; i < data.images.length; i++)
                {
                    sizes = data.images[i].sizes;
                    data.images[i].sizes = [];

                    for (let size in sizes)
                    {
                        data.images[i].sizes.push([sizes[size], sizes[size].width]);
                    }

                    data.images[i].sizes.sort(function(a, b) { return a[1] - b[1] });
                }

                this.rawImages = data.images;
            },

            load()
            {
                const bounds = this.viewport(this.$el);
                let w = bounds.w;

                if(this.$root.retina)
                {
                    w *= 1.5;
                }


                for(let i = 0; i < this.rawImages.length; i++)
                {
                    let src = null;
                    const l = this.rawImages[i].sizes.length;

                    for (let j = l - 1; j > -1; j--)
                    {
                        if (w < this.rawImages[i].sizes[j][1])
                        {
                            src = this.rawImages[i].sizes[j][0].file;
                        }
                    }

                    if (src === null)
                        src = this.rawImages[i].sizes[l - 1][0].file;

                    this.rawImages[i].src = this.rawImages[i].path + src;
                }

                this.first = this.rawImages[0];
                const image = new Image();

                image.onload = () =>
                {
                    this.firstLoaded = true;
                };

                image.src = this.first.src;
                this.images = this.rawImages;
            },

            scroll()
            {
                if(this.isVisibleHeightOnly(this.$el))
                {
                    if(!this.loaded)
                    {
                        this.load();
                        this.scrollListenKill(this.scroll);
                    }
                }
            },
        },
        mounted() {
            this.setup();
            this.scrollListen(this.scroll);
            this.scroll();
        }
    });
});