window.addEventListener("DOMContentLoaded", () => {
	Vue.component('block-mailform', {
		data: function () {
			return {
				flipped: false
			}
		},

		methods: {
			flip() {
				this.flipped = !this.flipped
			},
			wiggle() {
				this.$refs['form'].classList.add("wiggle");

				setTimeout(function (el) {
					el.classList.remove("wiggle");
				}, 3000, this.$refs['form']);
			},
			sendform() {
				if (this.$refs.input_email.value.length && this.$refs.input_name.value.length && this.$refs.input_subject.value.length && this.$refs.input_message.value.length) {
					//let href = "mailto:" + encodeURI(this.recipient + '?subject=' + this.subject + '&body=' + this.mailtext_generated);

					const post = {email : this.$refs.input_email.value, name: this.$refs.input_name.value, message: this.$refs.input_message.value, subject: this.$refs.input_subject.value};

					var self = this;

					axios.post("/wp-json/uae/v1/mail", post)
						.then(response => {
							self.flip();
						})
					.catch(error => {
					  this.errorMessage = error.message;
						self.wiggle();
					});

				} else {
					this.wiggle();
				}
			}
		}
	});
});