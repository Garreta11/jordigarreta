window.addEventListener('DOMContentLoaded', () => {

  Vue.component('block-special-collaborator-header', {
    data: function () {
      return {
        originHeight: 0,
        originBottom: 0,
        originPaddingBottom: 0,
      }
    },
    props: {},
    methods: {
      adjustBgShape(){

        var aspectBG = 1;

        var multi = this.$refs.collaboratorHeaderContent.clientHeight  / this.$refs.collaboratorHeaderContainer.clientHeight;

        this.$refs.collaboratorHeaderBg.style.transform = `scaleY(${multi * aspectBG})`;
        this.$refs.collaboratorHeaderBg.style.webkitTransform = `scaleY(${multi * aspectBG})`;

        var newContainerHeight = this.$refs.collaboratorHeaderBg.clientHeight * multi + parseFloat(window.getComputedStyle(this.$refs.collaboratorHeaderContainer, null).getPropertyValue('margin-top').split('px')[0]);
            
        this.$refs.collaboratorHeaderWrapper.style.height = newContainerHeight + 'px';
      },
    },
    mounted() {
      this.originHeight = this.$refs.collaboratorHeaderContainer.clientHeight;
      this.originBottom = parseFloat(window.getComputedStyle(this.$refs.collaboratorHeaderContainer, null).getPropertyValue('bottom').split('px')[0]);
      this.paddingBottom = parseFloat(window.getComputedStyle(this.$refs.collaboratorHeaderShop, null).getPropertyValue('padding-bottom').split('px')[0]);

      window.addEventListener('resize', this.adjustBgShape);
      this.adjustBgShape();
    }
  });
});


