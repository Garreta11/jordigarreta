window.addEventListener("DOMContentLoaded", () => {
    Vue.component('block-pavilionteaser', {
        data: function() {
            return {}
        },
        methods: {
            // changeButtonText(){
            //     let pavilion_teaser_button = document.getElementById("teaser_button");
            //     if(window.outerWidth < 764){
            //         pavilion_teaser_button.innerText = pavilion_teaser_button.dataset.alt_text;
            //     }
            //     else{
            //         pavilion_teaser_button.innerText = pavilion_teaser_button.dataset.text;
            //     }
            // }
        },
        mounted() {
            // window.addEventListener("resize", this.changeButtonText);

            // this.changeButtonText();
        },
    });
});