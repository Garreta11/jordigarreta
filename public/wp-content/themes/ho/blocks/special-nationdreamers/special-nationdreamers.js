window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("block-nationdreamers", {
    data: function () { return {}},
    props: {},
    methods: {
      updateContent() {},
    },
    mounted() {},
  });
});
