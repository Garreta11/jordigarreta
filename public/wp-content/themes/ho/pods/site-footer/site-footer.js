window.addEventListener("load", function () {
  var app = document.getElementById("site-footer");
  if (app) {
    new Vue({
      el: app,
      store,
      mixins: [mixinRoot],
    });
  }
});
