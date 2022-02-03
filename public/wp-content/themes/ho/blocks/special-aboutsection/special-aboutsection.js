window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("block-aboutsection", {
    data: function () { return {}},
    props: {},
    methods: {},
    mounted() {},
  });
});
