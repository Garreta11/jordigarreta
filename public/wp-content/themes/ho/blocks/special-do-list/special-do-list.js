window.addEventListener("DOMContentLoaded", () => {
    Vue.component("do-list", {
      data: function () {
        return {
          counter: 0,
          swiperoptions: {
            breakpoints: {
              1200: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 7,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
              560: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              430: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            },
            slidesPerView: 7,
            spaceBetween: 10,
            direction: "horizontal",
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          },
        };
      },
      props: {
        variable1:Number
      },
      methods: {
        toggleLike(_likes) {
          console.log("LIKES - " + _likes);
          //_likes++;
          this.counter = _likes + 1;
          console.log("COUNTER - " + this.counter);

          $('#post-status').submit();

        }
      },
      computed: {
        carousel() {
          return (
            "transform: translate3d(" + this.carouselTranslation + "px, 0px, 0px)"
          );
        },
      },
      mounted() {
      },
    });
  });
  