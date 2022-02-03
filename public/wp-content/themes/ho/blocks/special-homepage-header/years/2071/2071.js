window.addEventListener("DOMContentLoaded", () => {
    Vue.component('content2071', function(resolve, reject) {
        axios.get("/blocks/special-homepage-header/years/2071/2071.php").then(response => {
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