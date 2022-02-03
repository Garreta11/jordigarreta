window.addEventListener("DOMContentLoaded", () => {
    Vue.component("do-list-header", {
      data: function () {
        return {
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
      props: {},
      methods: {},
      computed: {},
      mounted() {},
    });
  });
  