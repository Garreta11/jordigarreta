window.addEventListener("DOMContentLoaded", () => {
    Vue.component('block-accordion', {
        methods: {
            prev(last)
            {
                for(let i = 0; i < this.$children.length; i++)
                {
                    if(this.$children[i] === last)
                    {
                        if(i === 0)
                        {
                            this.$children[this.$children.length-1].focus();
                            return;
                        }
                        else
                        {
                            this.$children[(i-1)].focus();
                            return;
                        }
                    }
                }
            },

            next(last)
            {
                for(let i = 0; i < this.$children.length; i++)
                {
                    if(this.$children[i] === last)
                    {
                        if(i === this.$children.length-1)
                        {
                            this.$children[0].focus();
                            return;
                        }
                        else
                        {
                            this.$children[(i+1)].focus();
                            return;
                        }
                    }
                }
            }
        }
    });
});