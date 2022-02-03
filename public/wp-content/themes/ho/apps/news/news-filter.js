window.addEventListener("DOMContentLoaded", () => {
    Vue.component('news-filter', {
        data: function() {
            return {
                items: [],
                filters: [],
                allActive: true
            }
        },
        props: {
            filterdata: Array
        },
        methods: {
            reset() {
                this.filters.forEach(function(currentItem) {
                    currentItem.active = false;
                });
                this.items.forEach(function(currentItem) {
                    currentItem.classList.remove("hide");
                    currentItem.classList.add("show");
                });
                this.allActive = true;

            },
            filter(filter) {

                this.$refs.items.classList.add('transition');

                this.filters.forEach(function(currentItem) {
                    currentItem.active = false;
                });
                this.allActive = false;
                filter.active = true;

                this.items.forEach(function(currentItem) {
                    let topics = currentItem.getAttribute('data-topics');

                    if (topics.indexOf(filter.slug) === -1) {
                        currentItem.classList.add("hide");
                        currentItem.classList.remove("show");
                    } else {
                        currentItem.classList.add("show");
                        currentItem.classList.remove("hide");
                    }
                });
            },
            change() {
                selected = this.$refs.select.value;

                if (!selected) {
                    this.reset();
                    return false;
                }

                matches = this.filters.filter(function(item) {
                    return (item.slug == selected)
                });

                this.filter(matches[0]);
            }
        },
        mounted() {
            this.items = this.$refs.items.querySelectorAll('[data-topics]');
            this.filters = this.filterdata;
        }
    });
});