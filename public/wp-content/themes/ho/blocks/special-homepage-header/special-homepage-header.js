window.addEventListener('DOMContentLoaded', () => {
  Vue.component('block-special-homepage-header', {
    data: function () {
      return {
        show1971: false,
        show2021: false,
        show2071: false,
        selectedYear: 0,
        selectedPrevYear: 0,
        selectedNextYear: 0,
        selectedYearSlogan: ""
        }
    },
    props: {
      letters: Array,
      openyear : String,
    },
    methods: {
      load1971(){
        this.$refs.headerwrapper.style.backgroundColor = "#A7BFC7";
        this.$refs.headerwrapper.classList.add("past-year-container");
        this.$refs.headerwrapper.classList.remove("present-year-container");
        this.$refs.headerwrapper.classList.remove("future-year-container");
        this.selectedYear = this.letters[0]["year"];
        this.selectedNextYear = this.letters[1]["year"];
        this.selectedYearSlogan = this.letters[0]["slogan"];
        this.show1971 = true;
        this.show2021 = false;
        this.show2071 = false;
        window.scrollTo(0,0);
      },
      load2021(){
        this.$refs.headerwrapper.classList.remove("past-year-container");
        this.$refs.headerwrapper.classList.add("present-year-container");
        this.$refs.headerwrapper.classList.remove("future-year-container");
        this.$refs.headerwrapper.style.backgroundColor = "#387973";
        this.selectedYear = this.letters[1]["year"];
        this.selectedPrevYear = this.letters[0]["year"];
        this.selectedNextYear = this.letters[2]["year"];
        this.selectedYearSlogan = this.letters[1]["slogan"];
        this.show1971 = false;
        this.show2021 = true;
        this.show2071 = false;
        window.scrollTo(0,0);
      },
      load2071(){
        /*
        this.$refs.headerwrapper.classList.remove("past-year-container");
        this.$refs.headerwrapper.classList.remove("present-year-container");
        this.$refs.headerwrapper.classList.add("future-year-container");
        this.selectedYear = this.letters[2]["year"];
        this.selectedPrevYear = this.letters[1]["year"];
        this.selectedYearSlogan = this.letters[2]["slogan"];
        this.show1971 = false;
        this.show2021 = false;
        this.show2071 = true;
        window.scrollTo(0,0);*/
      },
      hideAll(){
        this.$refs.headerwrapper.style.backgroundColor = "transparent";
        this.$refs.headerwrapper.classList.remove("past-year-container");
        this.$refs.headerwrapper.classList.remove("present-year-container");
        this.$refs.headerwrapper.classList.remove("future-year-container");
        this.selectedYear = 0;
        this.show1971 = false;
        this.show2021 = false;
        this.show2071 = false;
        window.scrollTo(0,0);
      },
      nextYear(){
        switch(this.selectedYear)
        {
          case '1971':
            this.load2021();
            break;
        }
      },
      prevYear(){
        switch(this.selectedYear)
        {
          case '2021':
            this.load1971();
            break;
        }
      },
    },
    mounted() {
      this.hideAll();
      switch(this.openyear)
      {
        case '1971':
          this.load1971();
          break;
        case '2021':
          this.load2021();
          break;
      }
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  if (!(typeof VueAwesomeSwiper === 'undefined' || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component('block-special-homepage-header-mobile-timeline', {
    data: function () {
      return {
        swiper: null,
        actualLetterContent: '',
        swiperoptions: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          initialSlide: 1,
          coverflowEffect: {
            rotate: 20,
            stretch: 100,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<p class="' +
                className +
                ' year-' +
                index +
                '">' +
                getYear(index) +
                '</p>'
              );
            },
          },
          spaceBetween: -75,
        },
      };
    },
    props: {
      letters: Array,
    },
    methods: {
      load(year){
        document.querySelector(`.link[data-year="${year}"]`).click();
      },
      updateContent() {
        this.actualLetterContent = this.letters[this.swiper.swiper.activeIndex];
      },
    },
    mounted() {
      this.actualLetterContent = this.letters[0];
      this.swiper = this.$refs.swiper;

      let el = window.location.href.split('#')[1];

      if (el) {
        el = document.getElementById(el);
        setTimeout(function () {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }

    if (document.querySelector('#slogan_bg_style'))
      document.head.insertAdjacentHTML("beforeend",
            '<style>' +
              document.querySelector('#slogan_bg_style').innerText.replace(/–/g, '--').replace(/(‘|’)/g, "'") +
            '</style>');
    },
  });
});

function getYear(index) {
  switch (index) {
    case 0:
      return '1971';
    case 1:
      return '2021';
    case 2:
      return '2071';
    default:
      break;
  }
}
