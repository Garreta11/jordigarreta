window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("block-aboutdownload", {
    data: function () { return {}},
    props: {},
    methods: {},
    mounted() {},
  });
});
