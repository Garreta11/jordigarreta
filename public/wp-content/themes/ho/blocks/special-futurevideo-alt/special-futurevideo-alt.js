window.addEventListener("DOMContentLoaded", () => {
    Vue.component('block-futurevideo-alt', {
        data: function() {
            return {}
        },
        methods:{
            startVideo() {
                document.getElementById("video-btn").style.display ="none";
                //TODO auto start video
            }
        },
        mounted() {}
    });
});