window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("block-nationteasers", {
    data: function () { return {}},
    props: {},
    mounted() {
      if (document.documentElement.lang === "ar") {
        let option = document.getElementById("emirate-select");
        option.options[0].text = "اختر الإمارة";
      }

      const visibelBlock = document.getElementById("nation-teasers");
      window.addEventListener("scroll", () => {
        this.checkVisible(visibelBlock);
      });
    },
    methods: {
      scrollIntoSection(e) {
        var id = e.target.value;
        /* var name = e.target.options[e.target.options.selectedIndex].text; */
        const element = document.getElementById(id);

        var yOffset = -50; 

        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({
          behavior: "smooth",
          top: y,
        });
      },
      scrollToSection: function (event) {
        const idValue = event.target.getAttribute("to-scroll");

        const element = document.getElementById(idValue);

        var yOffset = -50; 

        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        console.log(y);

        window.scrollTo({
          behavior: "smooth",
          top: y,
        });
      },
      checkVisible: function (element) {
        const rect = element.getBoundingClientRect();
        const leftSticky = document.getElementById("left-sticky");
        const leftMenu = document.getElementById("left-menu");

        const leftMenuBottom = document.getElementById("left-menu-bottom");
        var nationTeasersPaddingBottom = parseFloat(window.getComputedStyle(element, null).getPropertyValue('padding-bottom').split('px')[0]);
        var blockNationTeasersPaddingBottom = parseFloat(window.getComputedStyle(document.getElementsByClassName('block-nationteasers')[0], null).getPropertyValue('padding-bottom').split('px')[0]);
        leftMenuBottom.style.bottom = (nationTeasersPaddingBottom + blockNationTeasersPaddingBottom) + 'px';

        const nationHeader = document
          .getElementsByClassName("nation-header")[0]
          .getBoundingClientRect();

         var top = 210; 

        var bottom = top + leftSticky.clientHeight + nationTeasersPaddingBottom;
        

        if (document.documentElement.lang === "ar") {
          if (
            nationHeader.bottom <= 100 &&
            rect.top <= 300 &&
            rect.bottom >= bottom &&
            window.innerWidth >= 1920
          ) {
            leftSticky.style.position = "fixed";
            const rightValue = window.innerWidth - 1920 + 520;
            leftSticky.style.right = rightValue / 2 + "px";
            leftSticky.style.top = top + "px";
            leftSticky.style.display = "flex";
            leftMenu.style.display = "none";
            leftSticky.style.visibility = "visible";
          } else if (
            nationHeader.bottom <= 100 &&
            rect.top <= 690 &&
            rect.bottom >= bottom &&
            window.innerWidth < 1920
          ) {
            const rightValue = window.innerWidth - 1440 + 390;
            leftSticky.style.right = rightValue / 2 + "px";
            leftSticky.style.top = top + "px";
            leftSticky.style.position = "fixed";
            leftSticky.style.display = "flex";
            leftSticky.style.visibility = "visible";
            leftMenu.style.display = "none";
          } else {
            leftSticky.style.visibility = "hidden";
            leftMenu.style.display = "flex";
          }
        } else {
          if (
            nationHeader.bottom <= 90 &&
            rect.top <= 600 &&
            rect.bottom >= bottom &&
            window.innerWidth >= 1920
          ) {
            leftSticky.style.position = "fixed";
            const leftValue = window.innerWidth - 1920 + 400;
            leftSticky.style.left = leftValue / 2 + "px";
            leftSticky.style.top = top + "px";
            leftSticky.style.display = "flex";
            leftMenu.style.display = "none";
            leftSticky.style.visibility = "visible";
          } else if (
            nationHeader.bottom <= 90 &&
            rect.top <= 300 &&
            rect.bottom >= bottom &&
            window.innerWidth < 1920
          ) {
            const leftValue = window.innerWidth - 1440 + 300;
            leftSticky.style.left = leftValue / 2 + "px";
            leftSticky.style.top = top + "px";
            leftSticky.style.position = "fixed";
            leftSticky.style.display = "flex";
            leftMenu.style.display = "none";
            leftSticky.style.visibility = "visible";
          } else {
            leftSticky.style.visibility = "hidden";
            leftMenu.style.display = "flex";
          }
        }

        if (document.documentElement.lang === "ar") {
          if (rect.bottom <= bottom) {
            leftSticky.style.visibility = "hidden";
            leftMenu.style.display = "flex";
          }
        } else {
          if (rect.bottom <= bottom) {
            leftSticky.style.visibility = "hidden";
            leftMenu.style.display = "flex";
          }
        }
      },
    },
  });
});
