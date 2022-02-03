window.addEventListener('DOMContentLoaded', () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component('block-special-merchandise-slider', {
    data: function () {
      return {
        swiperoptions: {
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            560: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            425: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          },
          slidesPerView: 3,
          spaceBetween: 20,
          direction: "horizontal",
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        }
      }
    },
    props: {
      collaborators: Array
    },
    methods: {
      openLink(url){
        window.open(url, "_self");
      }
    },
    mounted() {
    }
  });
});
  
  
  