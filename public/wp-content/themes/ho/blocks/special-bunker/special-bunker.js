window.addEventListener("DOMContentLoaded", () => {
    Vue.component('block-bunker', {
        props: ['mailtext', 'recipient', 'subject', 'type', 'target_url'],
        data: function() {
            return {
                is_confirmed: false,
                flipped: false,
            }
        },

        computed: {
            mailtext_generated: function() {
                return this.mailtext.replace("$$$name$$$", this.$refs.input_name.value).replace("$$$email$$$", this.$refs.input_email.value);
            },
        },

        methods: {
            flip() {
                this.flipped = !this.flipped
            },
            confirm() {
                this.is_confirmed = true;
            },
            wiggle() {
                /*
                this.$refs['form'].classList.add("wiggle");

                setTimeout(function(el) {
                    el.classList.remove("wiggle");
                }, 3000, this.$refs['form']);
                */
            },
            sendform() {
                
                if(!validateEmail(this.$refs.input_email.value))
                {
                    this.$refs.input_email.classList.add('invalid');
                }

                if(!this.$refs.input_name.value.length > 0)
                {
                    this.$refs.input_name.classList.add('invalid');
                }

                if(!this.$refs.input_firstname.value.length > 0)
                {
                    this.$refs.input_firstname.classList.add('invalid');
                }

                if (this.type !== 'mailchimp' && this.$refs.input_email.value.length && this.$refs.input_name.value.length) {
                    let href = "mailto:" + encodeURI(this.recipient + '?subject=' + this.subject + '&body=' + this.mailtext_generated);
                    location.href = href;
                } else if (this.type === 'mailchimp' && this.$refs.input_email.value.length && this.$refs.input_name.value.length) {

                    var self = this;

                    let formData = new FormData(self.$refs['form']);
                    const data = {};

                    var form_url = self.$refs['form'].getAttribute('action') + '?';

                    // need to convert it before using not with XMLHttpRequest
                    for (let [key, val] of formData.entries()) {
                        Object.assign(data, {
                            [key]: val
                        })

                        form_url += '&' + key + '=' + val;
                    }

                    console.log('data', form_url);

                    const myInit = {
                        method: 'GET',
                        mode: 'no-cors',
                    };

                    const myRequest = new Request(form_url, myInit);

                    fetch(myRequest).then(function(response) {
                        return response;
                    }).then(function(response) {
                        if (self.target_url) {
                            location.href = self.target_url;
                        } else {
                            self.confirm();
                            self.flip();
                        }
                    }).catch(function(e) {
                        self.wiggle();
                    });

                    /*
                    axios.get(form_url, {
                    	params: data,
                    	mode: 'no-cors',
                    	withCredentials: true,
                    	credentials: 'same-origin',
                    	headers: {
                    		'Access-Control-Allow-Origin': '*',
                    		'Content-Type': 'application/json',
                    	  },
                    })
                    .then(response => {
                    	if (self.target_url) {
                    		location.href = self.target_url;
                    	} else {
                    		self.flip();
                    	}
                    })
                    .catch(error => {
                    	self.wiggle();
                    });

                    */

                    return false;
                } else {
                    this.wiggle();
                }
            }
        },
        mounted() {
            this.is_confirmed = false;
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}