Vue.component('modal', {
	props: {
		closebtn: {
			type: Boolean,
			default: true
		},

		fullWidth : {
			type: Boolean,
			default: true
		},
	},
    methods: {
        close(event) {
            if(event.target===this.$refs.bg || event.target===this.$refs.close)
            {
                this.$parent.close();
            }
        }
    },

	template: '#modal',
});
