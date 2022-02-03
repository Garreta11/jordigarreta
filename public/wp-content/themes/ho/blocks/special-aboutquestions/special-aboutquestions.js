window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("block-aboutquestions", {
    data: function () { return {}},
    props: {},
    methods: {},
    mounted() {},
  });
});
