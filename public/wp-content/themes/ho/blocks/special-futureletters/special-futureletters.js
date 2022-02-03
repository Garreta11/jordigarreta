window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("block-futureletter", {
    data: function () {
      return {
        swiper: null,
        actualLetterContent: "",
        swiperoptions: {
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: "auto",
          loop: true,
          coverflowEffect: {
            rotate: 0,
            stretch: 100,
            depth: 300,
            modifier: 1.1,
            slideShadows: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            420: {
              slidesPerView: 1.5
            },
          }
        },
      };
    },
    props: {
      letters: Array,
    },
    methods: {
      updateContent() {
        this.actualLetterContent = this.letters[this.swiper.swiper.realIndex];
      },
      openModal() {
        const modal = document.getElementById("future-letters-modal");
        const body = document.getElementsByTagName("body")[0];

        body.style.height = "100vh";
        body.style.overflowY = "hidden";

        modal.style.display = "block";

        var siteHeader = document.getElementById('site-header');

        siteHeader.querySelector('.header-wrapper').style.display = 'none';
        siteHeader.querySelector('.header-headline-container p').style.paddingBottom = '13px';
        siteHeader.querySelector('.header-headline-container p').style.paddingTop = '13px';
      },
      outsideClick(event) {
        const classes =  event.target.classList;
        if(classes.contains('modal-content') || classes.contains('modal-content__image') ) {
          return;
        }
        this.closeModal();
      },
      closeModal() {
        const modal = document.getElementById("future-letters-modal");
        const body = document.getElementsByTagName("body")[0];

        body.style.height = "auto";
        body.style.overflowY = "auto";

        modal.style.display = "none";

        var siteHeader = document.getElementById('site-header');
        siteHeader.querySelector('.header-wrapper').style.display = 'block';
        siteHeader.querySelector('.header-headline-container p').style.paddingBottom = '0';
        siteHeader.querySelector('.header-headline-container p').style.paddingTop = '26px';
      },
    },
    mounted() {
      this.actualLetterContent = this.letters[0];
      this.swiper = this.$refs.swiper;
      
      let el = window.location.href.split("#")[1];

      if (el) {
        el = document.getElementById(el);
        setTimeout(function () {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
  });
});
