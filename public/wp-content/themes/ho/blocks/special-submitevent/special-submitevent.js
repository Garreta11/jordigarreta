window.addEventListener("DOMContentLoaded", () => {
  if (
    !(typeof VueUploadComponent === "undefined" || VueUploadComponent === null)
  ) {
    Vue.component("file-upload", VueUploadComponent);
  }

  Vue.component("submit-event", {
    components: {
      vuejsDatepicker,
      VueTimepicker: VueTimepicker.default,
    },
    props: {
      startposition: Number,
      lang: String,
    },
    data: function () {
      return {
        //TODO: Create alt v-model for second language data
        showSecondLanguage: false,
        mode: "intro",
        position: 1,
        subposition: 1,
        files: [],
        comment_author_email: "",
        comment_author: "",
        submitted: false,
        loading: false,
        accept_tnc: false,
        more_material: "",
        title: "",
        title_alt: "",
        description: "",
        description_alt: "",
        category: "",
        startdate: "",
        showstart: "",
        showstarttime: "",
        showendtime: "",
        enddate: "",
        showend: "",
        starttime: "",
        endtime: "",
        startmeridiem: "",
        endmeridiem: "",
        location: "",
        locationdetails: "",
        locationdetails_alt: "",
        organizer: "",
        organizer_alt: "",
        url: "",
        url_alt: "",
        action: "/wp-json/uae/v1/uploadevent/",
        ar: vdp_translation_ar.js,
        en: vdp_translation_en.js,
        disabledStartDates: {
          to: new Date(Date.now() - 8640000),
        },
        enabledProceed: false,
        countSteps: 0,
      };
    },
    computed: {
      disabledEndDates: function () {
        return {
          to: new Date(this.startdate - 8640000),
        };
      },
      post_data: function () {
        return {
          comment_author_email: this.comment_author_email,
          comment_author: this.comment_author,
          category: this.category,
          title: this.title,
          title_alt: this.title_alt,
          description: this.description,
          description_alt: this.description_alt,
          start_date: this.startdate,
          end_date: this.enddate,
          location: this.location,
          location_details: this.locationdetails,
          location_details_alt: this.locationdetails_alt,
          organizer: this.organizer,
          organizer_alt: this.organizer_alt,
          url: this.url,
          url_alt: this.url_alt,
          lang: this.lang,
          comment_author_email: this.comment_author_email,
          comment_author: this.comment_author,
          current_lang: document.documentElement.lang,
        };
      },
      comment_author_email_valid: function () {
        return !this.submitted || validateEmail(this.comment_author_email);
      },
      comment_author_valid: function () {
        return !this.submitted || this.comment_author_email.length > 2;
      },
      accept_tnc_valid: function () {
        return !this.submitted || this.accept_tnc;
      },

      upload_done: function () {
        if (this.files.length === 0) {
          return false;
        }
        for (let i = 0; i < this.files.length; i++) {
          file = this.files[i];
          if (file.fileObject && !file.error && !file.success) {
            return false;
          }
        }
        return true;
      },
    },
    methods: {
      start() {
        this.mode = "submit";
      },
      checkInput(event) {
        const element = event.target;
        this.enabledProceed = element.value.length;
      },
      nextPosition: function () {
        this.position += 1;
        this.subposition = 1;
      },
      prevPosition: function () {
        this.position -= 1;
        this.subposition = 1;
      },
      nextSubposition: function () {
        console.log(this.countSteps);
        if (this.enabledProceed && this.countSteps <= 8) {
          this.subposition += 1;
          this.enabledProceed = false;
          this.countSteps++;
        } else if (this.countSteps >= 9) {
          this.subposition += 1;
          this.enabledProceed = true;
        }
      },
      prevSubposition: function () {
        this.subposition -= 1;
        this.enabledProceed = true;
      },
      is_filled_out(input) {
        console.log(input);
        console.log(this.submitted);
        console.log(input.length);
        return !this.submitted || input.length > 0;
      },
      submit: function () {
        this.submitted = true;

        var cansubmit = true;
        if (!this.comment_author_email_valid) {
          cansubmit = false;
        }
        // if (!this.accept_tnc_valid) {
        //     cansubmit = false;
        // }
        if (!this.comment_author_valid) {
          cansubmit = false;
        }

        if (!this.files.length) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.title)) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.description)) {
          cansubmit = false;
        }

        if (!this.startdate) {
          cansubmit = false;
        }

        if (!this.enddate) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.starttime)) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.endtime)) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.location)) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.locationdetails)) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.organizer)) {
          cansubmit = false;
        }

        if (!this.is_filled_out(this.url)) {
          cansubmit = false;
        }

        if (!cansubmit) {
          this.$refs["submitstep"].classList.add("wiggle");
          return false;
        }

        location.href = "#";
        location.href = "#submitevent";

        this.startdate =
          this.startdate.getMonth() +
          "/" +
          this.startdate.getDate() +
          "/" +
          this.startdate.getFullYear() +
          " " +
          this.starttime; // + " " + this.startmeridiem;
        this.enddate =
          this.enddate.getMonth() +
          "/" +
          this.enddate.getDate() +
          "/" +
          this.enddate.getFullYear() +
          " " +
          this.endtime; // + " " + this.endmeridiem;

        for (let i = 0; i < this.files.length; i++) {
          this.files[0].data = this.post_data;
        }

        this.subposition = 11;
        this.loading = true;

        this.$nextTick(() => {
          this.$refs.upload.active = true;
        });
      },
      inputFilter: function (newFile, oldFile, prevent) {
        this.enabledProceed = true;
        if (newFile && !oldFile) {
          if (
            !/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name) ||
            newFile.size > 2048 * 1024
          ) {
            return prevent();
          }
        }
        if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
          newFile.url = "";
          let URL = window.URL || window.webkitURL;
          if (URL && URL.createObjectURL) {
            newFile.url = URL.createObjectURL(newFile.file);
          }
        }
      },
      setCategory(event) {
        categories = this.$refs.categories.querySelectorAll(".category");
        categories.forEach((category) => {
          category.classList.remove("active");
        });

        event.target.classList.add("active");
        this.category = event.target.innerText;
        this.enabledProceed = true;
      },
      setStartDate() {
        this.showstart = this.setDate(this.startdate);

        if (this.showend) {
          this.enabledProceed = true;
        }
      },
      setEndDate() {
        this.showend = this.setDate(this.enddate);

        if (this.showstart) {
          this.enabledProceed = true;
        }
      },
      setStartTime() {
        this.showstarttime = this.setDate(this.startdate);

        if (this.showendtime) {
          this.enabledProceed = true;
        }
      },
      setEndTime() {
        this.showendtime = this.setDate(this.enddate);

        if (this.showstarttime) {
          this.enabledProceed = true;
        }
      },
      selectLocation(location) {
        this.enabledProceed = true;
      },
      setDate(date) {
        let monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        return (
          days[date.getDay()] +
          ", " +
          date.getDate() +
          " " +
          monthNames[date.getMonth()]
        );
      },
      toggleLanguage() {
        this.showSecondLanguage = !this.showSecondLanguage;
      },
    },

    mounted() {
      if (this.startposition) {
        this.position = this.startposition;
      }
      this.showSecondLanguage = false;
    },
  });
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
