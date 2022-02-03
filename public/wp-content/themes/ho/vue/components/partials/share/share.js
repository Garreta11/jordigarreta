const share = Vue.component('share', {
    data() {
        return {
            title: document.querySelector("meta[property='og:site_name']").getAttribute("content"),
            text: document.querySelector("meta[property='og:title']").getAttribute("content"),
            url: document.querySelector("meta[property='og:url']").getAttribute("content"),
            image: document.querySelector("meta[property='og:image']").getAttribute("content")
        }
    },
    props: {
        ismodalvisible: Boolean
    },

    watch: {
        ismodalvisible: function(n, o) {

            /* if (n && this.share()) {
               this.$emit('close');
             }*/
        }
    },

    mounted() {

        //trigger close with esc
        let self = this;


        /*window.addEventListener('keyup', function(event) {
            if (event.keyCode === 27) {
              self.$emit('close');
            }
        });


        document.getElementsByClassName('modal-backdrop')[0].addEventListener('click', function(event) {
          setTimeout(function() {self.$emit('close');}, 200);
        });*/

    },

    methods: {

        open() {
            console.log("OPEN!");
        },


        share() {
            if (navigator.share) {
                navigator.share({
                        title: this.title,
                        text: this.text,
                        url: this.url
                    }).then(() => {
                        this.$emit('close');
                    })
                    .catch(err => {
                        return false;
                    });
            } else {
                return false;
            }
        },
        copyToClipboard() {
            let copyText = document.getElementById("urlToCopy");
            copyText.value = this.url;
            copyText.select();
            document.execCommand("copy");

            this.$emit('close');
        },
        shareWithFacebook() {
            url = this.url;

            var shareString = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);

            var w = 980;
            var h = 500;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);

            window.open(shareString, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no,height=' + h + ',width=' + w + ',top=' + top + ', left=' + left + '');

            this.$emit('close');
        },

        shareWithInstagram() {

            //download image -- there is no instagram sharer
            var link = document.createElement("a");
            link.download = this.title;
            link.href = this.image;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;

            setTimeout(function() { location.href = "https://www.instagram.com/" }, 1500);
        },

        shareWithTwitter() {
            text = this.text;
            url = this.url;

            var shareString = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text);

            var w = 980;
            var h = 500;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);

            window.open(shareString, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no,height=' + h + ',width=' + w + ',top=' + top + ', left=' + left + '');

            this.$emit('close');
        },
        shareViaEmail() {
            title = this.title;
            text = this.text;
            url = this.url;
            window.location.href = "mailto:?to=&subject=" + title + '&body=' + text + '%0D%0A' + '%0D%0A' + encodeURIComponent(url);

            this.$emit('close');
        }
    },
    template: '#share',
});