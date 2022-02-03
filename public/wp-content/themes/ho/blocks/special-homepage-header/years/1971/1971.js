window.addEventListener("DOMContentLoaded", () => {
    Vue.component('content1971', function(resolve, reject) {
        axios.get("/blocks/special-homepage-header/years/1971/1971.php").then(response => {
            resolve({
                template: response.data,
                data: function() {
                    return {
                    }
                },
                computed: {},
                methods: {
                },
                mounted() {
                }
            })
        });
    })
});