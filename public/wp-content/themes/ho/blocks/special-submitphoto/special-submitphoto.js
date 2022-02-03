window.addEventListener("DOMContentLoaded", () => {
    if (!(typeof VueUploadComponent === 'undefined' || VueUploadComponent === null)) {
        Vue.component('file-upload', VueUploadComponent)
    }

    Vue.component('submit-photo', {
        props: {
            id: Number,
            startposition: Number
        },
        data: function() {
            return {
                position: 1,
                subposition: 1,
                files: [],
                comment_author_email: '',
                comment_author: '',
                submitted: false,
                loading: false,
                accept_tnc: false,
                more_material: '',
                who: '',
                name: '',
                story: '',
                proud: '',
                learned: '',
                action: '/wp-json/uae/v1/upload/',
                r: Math.floor(Math.random() * 9999999)
            }
        },
        computed: {
            post_data: function() {
                return {
                    'comment_author_email': this.comment_author_email,
                    'comment_author': this.comment_author,
                    'r': this.r,
                    'who': this.who,
                    'name': this.name,
                    'story': this.story,
                    'proud': this.proud,
                    'learned': this.learned,
                    'more_material': this.more_material,
                    'post_id': this.id
                }
            },
            comment_author_email_valid: function() {
                return !this.submitted || validateEmail(this.comment_author_email);
            },
            comment_author_valid: function() {
                return !this.submitted || this.comment_author_email.length > 2;
            },
            accept_tnc_valid: function() {
                return !this.submitted || this.accept_tnc;
            },

            upload_done: function() {
                if (this.files.length === 0) {
                    return false;
                }
                for (let i = 0; i < this.files.length; i++) {
                    file = this.files[i];
                    if (file.fileObject && !file.error && !file.success) {
                        return false
                    }
                }
                return true
            }
        },

        methods: {
            nextPosition: function() {
                this.position += 1;
                this.subposition = 1;
            },
            prevPosition: function() {
                this.position -= 1;
                this.subposition = 1;
            },
            nextSubposition: function() {
                this.subposition += 1;
            },
            prevSubposition: function() {
                this.subposition -= 1;
            },
            submit: function() {

                this.submitted = true;

                var cansubmit = true;
                if (!this.comment_author_email_valid) {
                    cansubmit = false;
                }
                if (!this.accept_tnc_valid) {
                    cansubmit = false;
                }
                if (!this.comment_author_valid) {
                    cansubmit = false;
                }

                if (!this.files.length) {
                    cansubmit = false;
                }

                if (!cansubmit) {
                    this.$refs['submitstep'].classList.add("wiggle");
                    return false;
                }

                for (let i = 0; i < this.files.length; i++) {
                    this.files[0].data = this.post_data;

                }

                this.subposition = 8;
                this.loading = true;

                this.$nextTick(() => {
                    this.$refs.upload.active = true;
                });
            },

            inputFilter: function(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name) || newFile.size > 2048 * 1024) {
                        return prevent()
                    }
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.url = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.url = URL.createObjectURL(newFile.file)
                    }
                }
            }
        },

        mounted() {
            if (this.startposition) {
                this.position = this.startposition;
            }
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}