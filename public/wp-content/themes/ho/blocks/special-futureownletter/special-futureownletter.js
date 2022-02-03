window.addEventListener("DOMContentLoaded", () => {
    if (!(typeof VueUploadComponent === 'undefined' || VueUploadComponent === null)) {
        Vue.component('file-upload', VueUploadComponent)
    }

    Vue.component('block-futureownletter', {
        data: function() {
            return {
                type: 'letter',
                subposition: 1,
                date: '',
                countryList: '',
                countriesAR: '',
                country: '',
                submitted: false,
                loading: false,
                files: [],
                comment_author_email: '',
                comment_author: '',
                terms_checkbox: false,
                text: '',
                action: '/wp-json/uae/v1/uploadletter/',
                timestamp: '',
                icsSelect: 5,
                url: '',
                file: '',
                last_selected_years: null,
            }
        },
        props: {
            startposition: Number,
            lang: String,
            icsname: String
        },
        computed: {
            disabledEndDates: function() {
                return {
                    to: new Date(this.startdate - 8640000)
                }
            },
            post_data: function() {
                return {
                    //'text': this.text,
                    'comment_author_email': this.comment_author_email,
                    'comment_author': this.comment_author,
                    'country': this.country
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
            text_valid: function() {
                return !this.submitted || this.text > 0;
            },
            checkbox_terms_true: function(){
                return !this.submitted || this.terms_checkbox;
            },
            files_selected: function() {
                return !this.submitted || this.files.length > 0
            },
            typed_in_url: function () {
                return !this.submitted || this.url.length > 0;
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
            },
            
            
        },
        watch: {
            type: function() {
                if(this.type) {
                    this.$nextTick(function() {
                        this.adjustBgShape();
                    });
                }
            },
            position: function() {
                if(this.position) {
                    this.$nextTick(function() {
                        this.adjustBgShape();
                    });
                }
            },
            subposition: function() {
                if(this.subposition) {
                    this.$nextTick(function() {
                        this.adjustBgShape();
                    });
                }
            },
        },
        methods: {
            getLocaleDate(){
                let today = new Date();
                const options = {year: 'numeric', month: 'short', day: 'numeric'}
                let lang = document.getElementsByTagName("html")[0].getAttribute("lang");
                if(lang == "ar"){
                    lang = "ar-AE";
                }
                else {
                    lang = "en-UK";
                }
                let date = today.toLocaleDateString(lang, options);
                return date;
            },
            shareWithFacebook() {
                var url = document.querySelector("meta[property='og:url']").getAttribute("content");

                var shareString = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=Dear future me, ${encodeURIComponent(this.text)}`;

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
                var url = document.querySelector("meta[property='og:url']").getAttribute("content");

                var shareString = "https://twitter.com/intent/tweet?url=" + url + "&text=Dear future me,%0a " + this.text + '%0a';

                var w = 980;
                var h = 500;
                var left = (screen.width / 2) - (w / 2);
                var top = (screen.height / 2) - (h / 2);

                window.open(shareString, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no,height=' + h + ',width=' + w + ',top=' + top + ', left=' + left + '');

                this.$emit('close');
            },
            shareWithWhatsapp() {
                var url = document.querySelector("meta[property='og:url']").getAttribute("content");

                var x = screen.width;
                let shareString;

                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    shareString = `whatsapp://send?text=Dear future me, ${encodeURIComponent(this.text)}   ${encodeURIComponent(url)}`

                   } else {
                    shareString = `https://api.whatsapp.com/send?text=Dear future me, ${encodeURIComponent(this.text)}   ${encodeURIComponent(url)}`

                   }

                var w = 980;
                var h = 500;
                var left = (screen.width / 2) - (w / 2);
                var top = (screen.height / 2) - (h / 2);

                window.open(shareString, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no,height=' + h + ',width=' + w + ',top=' + top + ', left=' + left + '');

            },
            windowResize(){
                if(window.innerWidth <= 768){
                    document.getElementById("to-submit-image-web").style.display = "none";
                    document.getElementById("to-submit-image-mobile").style.display = "flex";
                    document.getElementById("to-letter-web").style.display = "none";
                    document.getElementById("to-letter-mobile").style.display = "flex";
                }
                if(window.innerWidth > 768){
                    document.getElementById("to-submit-image-web").style.display = "flex";
                    document.getElementById("to-submit-image-mobile").style.display = "none";
                    document.getElementById("to-letter-web").style.display = "flex";
                    document.getElementById("to-letter-mobile").style.display = "none";
                }
                this.adjustBgShape();
            },
            setLetter() {
                
                this.type = 'letter';
                this.subposition = 1;
            },
            setMedia() {
                
                this.type = 'media';
                this.subposition = 1;
            },
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
            is_filled_out(input) {
                return !this.submitted || input.length > 0;
            },
            letterValidation: function() {
                this.submitted = true;
                let cansubmit = true;

                if(!this.text.length > 0 ){
                    cansubmit = false;
                }
                if(cansubmit){
                    this.nextSubposition();
                    this.submitted = false;
                }
                else{
                    this.$refs['letter_text'].classList.add('wiggle')
                }
            },
            mediaValidation: function() {
                this.submitted = true;
                let cansubmit = true;

                if(!(this.typed_in_url || this.files_selected)){
                    cansubmit = false;
                }
                if(cansubmit){
                    this.nextSubposition();
                    this.submitted = false;
                    
                }
                else {
                    return false;
                }
            },
            submit: function() {
                
                this.submitted = true;

                var cansubmit = true;
                if (!this.comment_author_email_valid) {
                    cansubmit = false;
                }
                if (this.type == "letter") {
                    if (!this.is_filled_out(this.text)) {
                        cansubmit = false;
                    }
                }
                if(!this.checkbox_terms_true){
                    cansubmit = false;
                }

                if (!cansubmit) {
                    this.$refs['submitstep'].classList.add("wiggle");
                    return false;
                }

                this.subposition = 3;
                this.loading = true;

                date = new Date().getTime();
                this.timestamp = date;

                //let url = "http://localhost:8888/wp-content/plugins/upload-letter-post/sendmail3.php?text=" + this.text + "&time=" + date;
                //let url = "https://new.uaeyearof.ae/wp-content/plugins/upload-letter-post/sendmail3.php?text=" + this.text + "&time=" + date;
                //let url = "http://uaeyearof.local/wp-content/plugins/upload-letter-post/sendmail.php?text=" + this.text + "&time=" + date;
                //let url = "https://uaeyearof.ae/wp-content/plugins/upload-letter-post/sendmail.php?text=" + this.text + "&time=" + date;
                let port = ":" + window.location.port;
                let url = window.location.protocol + "//" + window.location.hostname + port + "/wp-content/plugins/upload-letter-post/sendmail3.php?text=" + this.text + "&time=" + date;

                if (this.type == "letter") {
                    axios.post(url, JSON.stringify({
                            text: this.text,
                            date: this.date,
                            type: this.type,
                            country: this.country,
                            comment_author_email: this.comment_author_email,
                            comment_author: this.comment_author,
                            language: this.lang
                        }), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Allow-Control-Allow-Origin': '*'
                            }
                        })
                        .then(res => {
                            console.log("Mail send success");
                            console.log(res);
                        })
                        .catch(error => {
                            console.log(error.response);
                        });
                } else {

                    for (let i = 0; i < this.files.length; i++) {
                        this.files[0].data = this.post_data;
                    }

                    this.loading = true;

                    this.$nextTick(() => {
                        this.$refs.upload.active = true;
                    });
                }
                document.getElementById("container-submit").style.display ="none";
            },
            getFormatedDate(years=0){
                let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                let today = new Date();
                today.setFullYear(today.getFullYear() + parseInt(years))
                const options = {year: 'numeric', month: 'short', day: 'numeric'}
            
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = today.getMonth();
                let yyyy = today.getFullYear();
                
                if(this.lang == 'ar') {
                    let date = dd + '.' + mm + '.' + yyyy;
                    return date;
                } else {
                    let date = dd + '.' + mm + '.' + yyyy;
                    return date;
                }
               
            },
            hoverYears(evt){
                let hover_element = evt.srcElement;
                if(hover_element.dataset.hover === "true"){
                    hover_element.innerHTML = this.getFormatedDate(hover_element.dataset.years);
                    hover_element.style.setProperty('font-family', 'AkzidGroStd', 'important');
                }

                hover_element.dataset.hover = "false";
            },
            resetHover(evt){
                let hover_element = evt.srcElement;
                hover_element.dataset.hover = "true";
                let years = hover_element.dataset.years;
                let lang = document.getElementsByTagName("html")[0].getAttribute("lang");
                if(years != this.icsSelect && lang === 'en'){
                    hover_element.innerHTML = hover_element.dataset.years  + " years"; 
                } else if(years != this.icsSelect && lang === 'ar') {
                    hover_element.style.setProperty('font-family', '"29LT Zarid"', 'important');
                    if(years == 5 || years == 10) {
                        hover_element.innerHTML = hover_element.dataset.years  + " أعوام"; 
                    } else {
                        hover_element.innerHTML = hover_element.dataset.years  + " عاماً"; 
                    }
                }
            },
            clickSetYears(evt){
                this.icsSelect = evt.srcElement.dataset.years;
                if(this.last_selected_years !== null ){
                    if(this.last_selected_years.dataset.years !== this.icsSelect){
                    
                        this.last_selected_years.innerHTML = this.last_selected_years.dataset.years + " years"; 
                    }
                }
                
                this.last_selected_years = evt.srcElement;
                
            },
            downloadICS() {
                let cal = ics();
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth();
                let day = today.getDate();
                let date = new Date(year + this.icsSelect, month, day);
                cal.addEvent(this.icsname, this.text, 'United Arab Emirates', date, date);
                let fileName = this.icsname.split(" ").join("_");
                fileName = fileName.replace(",", "");
                cal.download(fileName);
            },
            download: function() {
                //let url = "https://uaeyearof.ae/wp-content/plugins/upload-letter-post/download_pdf.php?time=" + this.timestamp;
                //let url = "http://uaeyearof.local/wp-content/plugins/upload-letter-post/download_pdf.php?time=" + this.timestamp;
                //let url = "https://new.uaeyearof.ae/wp-content/plugins/upload-letter-post/download_pdf.php?time=" + this.timestamp;
                //let url = "http://localhost:8888/wp-content/plugins/upload-letter-post/download_pdf.php?time=" + this.timestamp;
                let port = ":" + window.location.port;
                let url = window.location.protocol + "//" + window.location.hostname + port + "/wp-content/plugins/upload-letter-post/download_pdf.php?time=" + date;
                window.open(url, '_blank').focus();
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
            },
            adjustBgShape(){

                var offsetInner = 0.05;
                var offsetOuter = 0.07;
                var aspectBG = 1;

                var multi = this.$refs.lettersubmitcontent.clientHeight / this.$refs.lettersubmitcontainer.clientHeight;
                
                if(window.matchMedia('(max-width: 768px)').matches) {
                    var viewWidth = window.innerWidth - 40;
                    aspectBG = 795 / viewWidth;
                }
      
                
            
                this.$refs.lettersubmitbackground.style.transform = `scaleY(${multi * aspectBG})`;
                this.$refs.lettersubmitbackground.style.webkitTransform = `scaleY(${multi * aspectBG})`;
                //this.$refs.containerheight.style.height = 'auto';
      
                var newContainerHeight = this.$refs.lettersubmitbackground.clientHeight * multi + parseFloat(window.getComputedStyle(this.$refs.lettersubmitheight, null).getPropertyValue('padding-bottom').split('px')[0]) + parseFloat(window.getComputedStyle(this.$refs.lettersubmitheight, null).getPropertyValue('padding-top').split('px')[0]);
                  
                this.$refs.lettersubmitheight.style.height = newContainerHeight + 'px';
              },
        },
        mounted() {
            this.windowResize;
            window.addEventListener('resize', this.windowResize);
            this.icsSelect = 0;
            this.setLetter();
            this.subposition = 1;

            this.adjustBgShape();

            let formated_date = this.getFormatedDate();

            this.date = formated_date;

            this.countryList = [
                "Afghanistan",
                "Albania",
                "Algeria",
                "American Samoa",
                "Andorra",
                "Angola",
                "Anguilla",
                "Antarctica",
                "Antigua and Barbuda",
                "Argentina",
                "Armenia",
                "Aruba",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas (the)",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bermuda",
                "Bhutan",
                "Bolivia (Plurinational State of)",
                "Bonaire, Sint Eustatius and Saba",
                "Bosnia and Herzegovina",
                "Botswana",
                "Bouvet Island",
                "Brazil",
                "British Indian Ocean Territory (the)",
                "Brunei Darussalam",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cabo Verde",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Cayman Islands (the)",
                "Central African Republic (the)",
                "Chad",
                "Chile",
                "China",
                "Christmas Island",
                "Cocos (Keeling) Islands (the)",
                "Colombia",
                "Comoros (the)",
                "Congo (the Democratic Republic of the)",
                "Congo (the)",
                "Cook Islands (the)",
                "Costa Rica",
                "Croatia",
                "Cuba",
                "Curaçao",
                "Cyprus",
                "Czechia",
                "Côte d'Ivoire",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic (the)",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Eswatini",
                "Ethiopia",
                "Falkland Islands (the) [Malvinas]",
                "Faroe Islands (the)",
                "Fiji",
                "Finland",
                "France",
                "French Guiana",
                "French Polynesia",
                "French Southern Territories (the)",
                "Gabon",
                "Gambia (the)",
                "Georgia",
                "Germany",
                "Ghana",
                "Gibraltar",
                "Greece",
                "Greenland",
                "Grenada",
                "Guadeloupe",
                "Guam",
                "Guatemala",
                "Guernsey",
                "Guinea",
                "Guinea-Bissau",
                "Guyana",
                "Haiti",
                "Heard Island and McDonald Islands",
                "Holy See (the)",
                "Honduras",
                "Hong Kong",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran (Islamic Republic of)",
                "Iraq",
                "Ireland",
                "Isle of Man",
                "Israel",
                "Italy",
                "Jamaica",
                "Japan",
                "Jersey",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "Korea (the Democratic People's Republic of)",
                "Korea (the Republic of)",
                "Kuwait",
                "Kyrgyzstan",
                "Lao People's Democratic Republic (the)",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Macao",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Marshall Islands (the)",
                "Martinique",
                "Mauritania",
                "Mauritius",
                "Mayotte",
                "Mexico",
                "Micronesia (Federated States of)",
                "Moldova (the Republic of)",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Montserrat",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nauru",
                "Nepal",
                "Netherlands (the)",
                "New Caledonia",
                "New Zealand",
                "Nicaragua",
                "Niger (the)",
                "Nigeria",
                "Niue",
                "Norfolk Island",
                "Northern Mariana Islands (the)",
                "Norway",
                "Oman",
                "Pakistan",
                "Palau",
                "Palestine, State of",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines (the)",
                "Pitcairn",
                "Poland",
                "Portugal",
                "Puerto Rico",
                "Qatar",
                "Republic of North Macedonia",
                "Romania",
                "Russian Federation (the)",
                "Rwanda",
                "Réunion",
                "Saint Barthélemy",
                "Saint Helena, Ascension and Tristan da Cunha",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Martin (French part)",
                "Saint Pierre and Miquelon",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Sint Maarten (Dutch part)",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Georgia and the South Sandwich Islands",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan (the)",
                "Suriname",
                "Svalbard and Jan Mayen",
                "Sweden",
                "Switzerland",
                "Syrian Arab Republic",
                "Taiwan",
                "Tajikistan",
                "Tanzania, United Republic of",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Tokelau",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Turks and Caicos Islands (the)",
                "Tuvalu",
                "Uganda",
                "Ukraine",
                "United Arab Emirates (the)",
                "United Kingdom of Great Britain and Northern Ireland (the)",
                "United States Minor Outlying Islands (the)",
                "United States of America (the)",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Venezuela (Bolivarian Republic of)",
                "Viet Nam",
                "Virgin Islands (British)",
                "Virgin Islands (U.S.)",
                "Wallis and Futuna",
                "Western Sahara",
                "Yemen",
                "Zambia",
                "Zimbabwe",
                "Åland Islands"
            ];
            this.countriesAR = [
                "أفغانستان",
                "جزر آلاند",
                "ألبانيا",
                "الجزائر",
                "ساموا الأمريكية",
                "أندورا",
                "أنغولا",
                "أنغيلا",
                "أنتاركتيكا",
                "أنتيغوا وبربودا",
                "الأرجنتين",
                "أرمينيا",
                "أروبا",
                "أستراليا",
                "النمسا",
                "أذربيجان",
                "جزر البهاما",
                "البحرين",
                "بنغلاديش",
                "بربادوس",
                "بيلاروسيا",
                "بلجيكا",
                "بليز",
                "بنين",
                "برمودا",
                "بوتان",
                "بوليفيا",
                "بونير وسانت يوستاتيوس وسابا",
                "البوسنة والهرسك",
                "بوتسوانا",
                "جزيرة بوفيت",
                "البرازيل",
                "إقليم المحيط البريطاني الهندي",
                "بروناي دار السلام",
                "بلغاريا",
                "بوركينا فاسو",
                "بوروندي",
                "كمبوديا",
                "الكاميرون",
                "كندا",
                "الرأس الأخضر",
                "جزر كايمان",
                "جمهورية افريقيا الوسطى",
                "تشاد",
                "تشيلي",
                "الصين",
                "جزيرة الكريسماس",
                "جزر كوكوس (كيلينغ)",
                "كولومبيا",
                "جزر القمر",
                "الكونغو",
                "الكونغو ، جمهورية الكونغو الديمقراطية",
                "جزر كوك",
                "كوستا ريكا",
                "ساحل العاج",
                "كرواتيا",
                "كوبا",
                "كوراكاو",
                "قبرص",
                "الجمهورية التشيكية",
                "الدنمارك",
                "جيبوتي",
                "دومينيكا",
                "جمهورية الدومنيكان",
                "الاكوادور",
                "مصر",
                "السلفادور",
                "غينيا الإستوائية",
                "إريتريا",
                "إستونيا",
                "أثيوبيا",
                "جزر فوكلاند (مالفيناس)",
                "جزر فاروس",
                "فيجي",
                "فنلندا",
                "فرنسا",
                "غيانا الفرنسية",
                "بولينيزيا الفرنسية",
                "المناطق الجنوبية لفرنسا",
                "الجابون",
                "غامبيا",
                "جورجيا",
                "ألمانيا",
                "غانا",
                "جبل طارق",
                "اليونان",
                "الأرض الخضراء",
                "غرينادا",
                "جوادلوب",
                "غوام",
                "غواتيمالا",
                "غيرنسي",
                "غينيا",
                "غينيا بيساو",
                "غيانا",
                "هايتي",
                "قلب الجزيرة وجزر ماكدونالز",
                "الكرسي الرسولي (دولة الفاتيكان)",
                "هندوراس",
                "هونج كونج",
                "هنغاريا",
                "أيسلندا",
                "الهند",
                "إندونيسيا",
                "جمهورية إيران الإسلامية",
                "العراق",
                "أيرلندا",
                "جزيرة آيل أوف مان",
                "إسرائيل",
                "إيطاليا",
                "جامايكا",
                "اليابان",
                "جيرسي",
                "الأردن",
                "كازاخستان",
                "كينيا",
                "كيريباتي",
                "كوريا، الجمهورية الشعبية الديمقراطية",
                "جمهورية كوريا",
                "كوسوفو",
                "الكويت",
                "قيرغيزستان",
                "جمهورية لاو الديمقراطية الشعبية",
                "لاتفيا",
                "لبنان",
                "ليسوتو",
                "ليبيريا",
                "الجماهيرية العربية الليبية",
                "ليختنشتاين",
                "ليتوانيا",
                "لوكسمبورغ",
                "ماكاو",
                "مقدونيا ، جمهورية يوغوسلافيا السابقة",
                "مدغشقر",
                "ملاوي",
                "ماليزيا",
                "جزر المالديف",
                "مالي",
                "مالطا",
                "جزر مارشال",
                "مارتينيك",
                "موريتانيا",
                "موريشيوس",
                "مايوت",
                "المكسيك",
                "ولايات ميكرونيزيا الموحدة",
                "جمهورية مولدوفا",
                "موناكو",
                "منغوليا",
                "الجبل الأسود",
                "مونتسيرات",
                "المغرب",
                "موزمبيق",
                "ميانمار",
                "ناميبيا",
                "ناورو",
                "نيبال",
                "هولندا",
                "جزر الأنتيل الهولندية",
                "كاليدونيا الجديدة",
                "نيوزيلاندا",
                "نيكاراغوا",
                "النيجر",
                "نيجيريا",
                "نيوي",
                "جزيرة نورفولك",
                "جزر مريانا الشمالية",
                "النرويج",
                "سلطنة عمان",
                "باكستان",
                "بالاو",
                "الأراضي الفلسطينية المحتلة",
                "بنما",
                "بابوا غينيا الجديدة",
                "باراغواي",
                "بيرو",
                "فيلبيني",
                "بيتكيرن",
                "بولندا",
                "البرتغال",
                "بورتوريكو",
                "دولة قطر",
                "جمع شمل",
                "رومانيا",
                "الاتحاد الروسي",
                "رواندا",
                "سانت بارتيليمي",
                "سانت هيلانة",
                "سانت كيتس ونيفيس",
                "القديسة لوسيا",
                "القديس مارتن",
                "سانت بيير وميكلون",
                "سانت فنسنت وجزر غرينادين",
                "ساموا",
                "سان مارينو",
                "ساو تومي وبرينسيبي",
                "المملكة العربية السعودية",
                "السنغال",
                "صربيا",
                "صربيا والجبل الأسود",
                "سيشيل",
                "سيرا ليون",
                "سنغافورة",
                "سينت مارتن",
                "سلوفاكيا",
                "سلوفينيا",
                "جزر سليمان",
                "الصومال",
                "جنوب أفريقيا",
                "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
                "جنوب السودان",
                "إسبانيا",
                "سيريلانكا",
                "السودان",
                "سورينام",
                "سفالبارد وجان ماين",
                "سوازيلاند",
                "السويد",
                "سويسرا",
                "الجمهورية العربية السورية",
                "مقاطعة تايوان الصينية",
                "طاجيكستان",
                "جمهورية تنزانيا المتحدة",
                "تايلاند",
                "تيمور ليشتي",
                "توجو",
                "توكيلاو",
                "تونغا",
                "ترينداد وتوباغو",
                "تونس",
                "ديك رومى",
                "تركمانستان",
                "جزر تركس وكايكوس",
                "توفالو",
                "أوغندا",
                "أوكرانيا",
                "الإمارات العربية المتحدة",
                "المملكة المتحدة",
                "الولايات المتحدة",
                "جزر الولايات المتحدة البعيدة الصغرى",
                "أوروغواي",
                "أوزبكستان",
                "فانواتو",
                "فنزويلا",
                "فييت نام",
                "جزر العذراء البريطانية",
                "جزر فيرجن ، الولايات المتحدة",
                "واليس وفوتونا",
                "الصحراء الغربية",
                "اليمن",
                "زامبيا",
                "زيمبابوي"
            ];



            document.querySelectorAll('a[href^="#"]').forEach(a => {
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    var href = this.getAttribute("href");
                    var elem = document.querySelector(href) || document.querySelector("a[name=" + href.substring(1, href.length) + "]");
                    //gets Element with an id of the link's href 
                    //or an anchor tag with a name attribute of the href of the link without the #
                    window.scroll({
                        top: elem.offsetTop,
                        left: 0,
                        behavior: 'smooth'
                    });
                    //if you want to add the hash to window.location.hash
                    //you will need to use setTimeout to prevent losing the smooth scrolling behavior
                    //the following code will work for that purpose
                    /*setTimeout(function(){
                         window.location.hash = this.hash;
                     }, 2000); */
                });
            });
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}