window.addEventListener("DOMContentLoaded", () => {
  
    Vue.component("block-single-nation-letters", {
      data: function () { return {}},
      props: {},
      methods: {
        adjustBgShape(){

          var offsetInner = 0.05;
          var offsetOuter = 0.07;
          
          if(window.matchMedia('(max-width: 520px)').matches) {
            offsetInner = 0;
            offsetOuter = 0.15;
          }

          var multi = this.$refs.singlenationcontainer.clientHeight / this.$refs.singlenationletter.clientHeight + offsetInner;
      
          this.$refs.nationbgshape.style.transform = `scaleY(${multi})`;
          this.$refs.nationbgshape.style.webkitTransform = `scaleY(${multi})`;
          this.$refs.containerheight.style.height = 'auto';
            
          //var newContainerHeight = this.$refs.containerheight.clientHeight * (multi + offsetOuter);

          console.log(this.$refs.nationbgshape.clientHeight);

          var newContainerHeight = this.$refs.nationbgshape.clientHeight * multi + parseFloat(window.getComputedStyle(this.$refs.containerheight, null).getPropertyValue('padding-bottom').split('px')[0]) + parseFloat(window.getComputedStyle(this.$refs.containerheight, null).getPropertyValue('padding-top').split('px')[0]);
            
          this.$refs.containerheight.style.height = newContainerHeight + 'px';
        },
      },
      mounted() {
        this.adjustBgShape();
        window.addEventListener('resize', this.adjustBgShape);
      },
    });
  });

  
  

  