window.addEventListener("DOMContentLoaded", () => {

    Vue.component('block-startpage', {
        data: function() {
            return {
              showPlayerFlag: false
            }
        },
        methods:{

          showPlayer () {
            this.showPlayerFlag = true;
          },

          hidePlayer () {
            this.showPlayerFlag = false;
            window.player.stopVideo();
          }

        },
        mounted() {

          const tag = document.createElement('script');
          const firstScriptTag = document.getElementsByTagName('script')[0];
          tag.src = "https://www.youtube.com/iframe_api";
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          window.player = null;
          window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('player', {
              height: '100%',
              width: '100%',
              videoId: 'r6zzqml1aKU',
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                cc_load_policy: 1,
                disablekb: 1,
                enablejsapi: 1,
                iv_load_policy: 3,
                rel: 0,
                showinfo: 0,
                mute: 0
              },
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
          }

          function onPlayerReady(event) {
            //event.target.playVideo();
          }

          let done = false;
          function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) done = true;
          }

          function stopVideo() {
            player.stopVideo();
          }

        }
    });
});
