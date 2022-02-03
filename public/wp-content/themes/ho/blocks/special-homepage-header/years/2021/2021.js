window.addEventListener("DOMContentLoaded", () => {
    Vue.component('content2021', function(resolve, reject) {
        axios.get("/blocks/special-homepage-header/years/2021/2021.php").then(response => {
            resolve({
                template: response.data,
                data: function() {
                    return {}
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