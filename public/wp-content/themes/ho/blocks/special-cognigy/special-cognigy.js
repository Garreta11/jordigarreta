window.addEventListener("DOMContentLoaded", () => {
    Vue.component('block-cognigy', {
        mixins: [mixinViewport],
        data: function() {
            return {
                mode: 'intro',
                starting: true
            }
        },
        created() {
            window.addEventListener('scroll', this.onScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            start() {
                this.mode = 'chatbot';
                this.anim.destroy();
                this.animation(this.$refs.botsmile_chat_anim, "Default", true);
            },
            upload() {
                this.mode = 'upload';
                document.querySelector('#contribute').scrollIntoView({behavior: 'smooth'});
            },
            onMessage(event) {
                //callback from cognigy when talking phase is over
                if (event.data.upload) {
                    this.mode = 'upload';
                }
            },
            animation(ref, name, loop = true, autoplay = true) {
                this.anim = lottie.loadAnimation({
                    container: ref, // required
                    path: '/wp-content/themes/ho/assets/botanimations/UAE_' + name + '.json', // required
                    renderer: 'svg', // required
                    loop: loop, // optional
                    autoplay: autoplay, // optional
                    name: name, // optional
                    rendererSettings: {
                        clearCanvas: true
                    },
                });
            },
            playStartAnimation() {
                if (this.isVisibleHeightOnly(this.$el)) {
                    setTimeout(() => {
                        this.animation(this.$refs.botsmile_start_anim, "Start", false);
                        this.anim.addEventListener('complete', () => {
                            this.starting = false;
                            this.animation(this.$refs.botsmile_default_anim, "Default");
                        });
                    }, 1000);
                    window.removeEventListener('scroll', this.onScroll);
                }
            },
            handleAnimation: function(anim) {
                this.anim = anim;
            },
            stop: function() {
                this.anim.stop();
            },
            play: function() {
                this.anim.play();
            },
            pause: function() {
                this.anim.pause();
            },
            onScroll(e) {
                this.playStartAnimation();
            },
        },

        mounted() {
            if (window.addEventListener) {
                window.addEventListener("message", this.onMessage, false);
            } else if (window.attachEvent) {
                window.attachEvent("onmessage", this.onMessage, false);
            }

            this.playStartAnimation();
        }
    });

    Vue.component('bot-anim', {
        mixins: [mixinViewport],
        data: function() {
            return {
                showEmotion: true,
            }
        },
        methods: {
            onMessage(event) {
                if (event.data.emotion) {
                    this.emotion(this.$refs.botsmile_chat_emo, event.data.emotion, false);

                    setTimeout(() => {
                        this.showEmotion = true;
                        this.stop();
                    }, 500);

                    this.emo.addEventListener('complete', () => {
                        this.play();
                        this.showEmotion = false;
                    });
                }
            },
            animation(ref, name, loop = true, autoplay = true) {
                if (this.anim != null) {
                    this.anim.destroy();
                }
                this.anim = lottie.loadAnimation({
                    container: ref, // required
                    path: '/wp-content/themes/ho/assets/botanimations/UAE_' + name + '.json', // required
                    renderer: 'svg', // required
                    loop: loop, // optional
                    autoplay: autoplay, // optional
                    name: name, // optional
                    rendererSettings: {
                        clearCanvas: true
                    },
                });
            },
            emotion(ref, name, loop = true, autoplay = true) {
                if (this.emo != null) {
                    this.emo.destroy();
                }
                this.emo = lottie.loadAnimation({
                    container: ref, // required
                    path: '/wp-content/themes/ho/assets/botanimations/UAE_' + name + '.json', // required
                    renderer: 'svg', // required
                    loop: loop, // optional
                    autoplay: autoplay, // optional
                    name: name, // optional
                    rendererSettings: {
                        clearCanvas: true
                    },
                });
            },
            handleAnimation: function(anim) {
                this.anim = anim;
            },
            stop: function() {
                this.anim.stop();
            },
            play: function() {
                this.anim.play();
            },
            pause: function() {
                this.anim.pause();
            },
        },

        mounted() {
            if (window.addEventListener) {
                window.addEventListener("message", this.onMessage, false);
            } else if (window.attachEvent) {
                window.attachEvent("onmessage", this.onMessage, false);
            }
            this.animation(this.$refs.botsmile_chat_anim, "Default");
            window.postMessage({ 'emotion': 'Start' }, "*");
        }
    });
});
