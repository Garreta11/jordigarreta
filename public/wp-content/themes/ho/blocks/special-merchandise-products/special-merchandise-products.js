window.addEventListener('DOMContentLoaded', () => {
  var VueMasonryPlugin = window["vue-masonry-plugin"].VueMasonryPlugin
  Vue.use(VueMasonryPlugin);
  Vue.component('block-special-merchandise-products', {
    data: function () {
      return {
        items: [],
        filters: [],
        allActive: true,
        product_nodes: [],
      }
    },
    props: {
      filterdata: Array,
    },
    methods: {
      reset(scroll = true) {
        this.filters.forEach(function (currentItem) {
          currentItem.active = false;
        });
        /*
        this.items.forEach(function (currentItem) {
          currentItem.classList.remove("hide");
          currentItem.classList.add("show");
        });*/
        this.$refs.items.innerHtml = '';
        for(var i = 0; i < this.product_nodes.length; i++)
        {
          this.product_nodes[i].classList.add("show");
          this.product_nodes[i].classList.remove("hide");
          this.$refs.items.appendChild(this.product_nodes[i]);
        }
        this.allActive = true;

        this.$redrawVueMasonry();

        if(scroll)
        this.scrollToTop();
      },
      filter(filter, scroll = true) {
        
        this.$refs.items.classList.add('transition');

        this.filters.forEach(function (currentItem) {
          currentItem.active = false;
        });
        this.allActive = false;
        filter.active = true;

       for(var i = 0; i < this.product_nodes.length; i++)
       {
        let topics = this.product_nodes[i].getAttribute('data-topics');
        let product = this.product_nodes[i];
        if (topics.indexOf(filter.slug) === -1) {
          product.classList.add("hide");
          product.classList.remove("show");
          setTimeout(()=>{product.remove()}, 500);
        } else {
          product.classList.add("show");
          product.classList.remove("hide");
          this.$refs.items.appendChild(product);
        }
       }

       setTimeout(()=>{this.$redrawVueMasonry();}, 600);

        if(scroll)
        this.scrollToTop();
      },
      change() {
        selected = this.$refs.select.value;

        if (selected === "") {
            this.reset(false);
            return false;
        }

        matches = this.filters.filter(function(item) {
            return (item.slug == selected)
        });

        this.filter(matches[0],false);
        this.$redrawVueMasonry();
      },
      scrollToTop() {
        let rectItems = this.$refs.items.getBoundingClientRect();

        var yOffset = this.$refs.productFilter.clientHeight * -1; 
        const y = rectItems.top + window.scrollY + yOffset;

        window.scrollTo({
          behavior: "smooth",
          top: y,
        });
      },
    },
    mounted() {
      this.items = this.$refs.items.querySelectorAll('[data-topics]');
      this.filters = this.filterdata;
      //this.product_nodes = [].slice.call(this.$refs.items.children);
      this.product_nodes = [...this.$refs.items.children];
      this.product_nodes.shift();
      window.addEventListener("resize", () => this.$redrawVueMasonry());
      window.addEventListener("scroll", () => {
        let rectItems = this.$refs.items.getBoundingClientRect();
        var top = 244;
        var bottom = this.$refs.productFilter.clientHeight + top + 100;
        if(rectItems.y <= top && rectItems.bottom > bottom)
        {
          this.$refs.productFilter.style.position = "fixed";
          this.$refs.productFilter.style.top = top + "px";
          this.$refs.productFilterContainer.style.alignItems = 'baseline';
          this.$refs.productFilter.style.marginBottom = '0';
        } 
        else if(rectItems.bottom <= bottom) {
          this.$refs.productFilterContainer.style.alignItems = 'flex-end';
          this.$refs.productFilter.style.position = "static";
          this.$refs.productFilter.style.marginBottom = '100px';
        }
        else {
          this.$refs.productFilter.style.position = "static";
          this.$refs.productFilter.style.marginBottom = '0';
        }
      });
    }
  });
});


