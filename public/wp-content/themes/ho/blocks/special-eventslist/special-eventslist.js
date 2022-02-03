window.addEventListener("DOMContentLoaded", () => {
  if (!(typeof VueAwesomeSwiper === "undefined" || VueAwesomeSwiper === null)) {
    Vue.use(VueAwesomeSwiper);
  }

  Vue.component("events-filter", {
    data: function () {
      return {
        events: [],
        nearEvents: [],
        eventCounter: 0,
        nearEventCounter: 0,
        availableCategories: [],
        availableDates: [],
        availableLocations: [],
        moreEvents: false,
        moreNearEvents: false,
        locations: [],
        filters: [],
        months: [],
        locationFilterActive: false,
        showMoreFilters: false,
        carouselTranslation: 0,
        eventsToShow: 4,
        nearEventsToShow: 4,
        swiperoptions: {
          breakpoints: {
            1200: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            560: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            430: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          },
          slidesPerView: 7,
          spaceBetween: 10,
          direction: "horizontal",
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
      };
    },
    props: {
      categories: Array,
      eventlist: Array,
      lang: String,
      eventItems: Array,
    },
    methods: {
      addFilter(type, name, displayString = '') {

        // console.log("Add Filter: " + name + " - " + type);
        this.filters.push({ type: type, name: name, displayString });
      },
      removeFilter(index) {
        // console.log("Remove Filter: " + index);
        this.filters.splice(index, 1);
      },
      clearFilters() {
        this.filters = [];
        document.querySelectorAll('.filters .category').forEach(category => category.classList.remove('active'));
        document.querySelectorAll('.month').forEach(category => category.classList.remove('active'));
        this.applyAllFilters(4);
      },
      applyCategoryFilter(newFilter) {
        categoryList = this.$refs.categoriesList.querySelectorAll(".category");
        filters = new Array(0);
        categoryList.forEach((category) => {
          if (category.classList.contains(newFilter.slug)) {
            category.classList.toggle("active");
            
            if (category.classList.contains("active")) {
              this.addFilter("category", newFilter.slug, newFilter.name);
            } else {
              let i = 0;
              this.filters.forEach((filter) => {
                if (filter.name == newFilter.slug) {
                  this.removeFilter(i);
                }
                i++;
              });
            }
          }
        });

        this.applyAllFilters(4);
      },
      applyDateFilter(newFilter) {
        monthList = this.$refs.monthList.querySelectorAll(".month");
        monthList.forEach((month) => {
          if (month.classList.contains(newFilter.slug)) {
            month.classList.toggle("active");

            if (month.classList.contains("active")) {
              this.addFilter("date", newFilter.slug, `${newFilter.month} ${newFilter.year.toString().slice(2, 4)}`);
            } else {
              let i = 0;
              this.filters.forEach((filter) => {
                if (filter.name == newFilter.slug) {
                  this.removeFilter(i);
                  return;
                }
                i++;
              });
            }
          }
        });

        this.applyAllFilters(4);
      },
      applyLocationFilter(name) {
        let i = 0;
        this.filters.forEach((filter) => {
          if (filter.type == "location") {
            this.removeFilter(i);
            this.locationFilterActive = false;
            return;
          }
          i++;
        });

        if (name.target.value != "all") {
          this.locationFilterActive = true;
          this.addFilter("location", name.target.value);
        }

        this.applyAllFilters(4);
      },
      applyAllFilters(amount) {
        showCounter = 0;

        this.eventsToShow = amount;
        this.moreEvents = false;

        this.events.forEach((event) => {
          showEvent = this.matchesAllFilters(event);

          if (showEvent) {
            showCounter++;
            event.classList.remove("hide");
          } else {
            event.classList.add("hide");
          }

          if (
            showCounter > this.eventsToShow &&
            event.classList.contains("hide") == false
          ) {
            this.moreEvents = true;
            event.classList.add("hide");
          }
        });
        this.eventCounter = showCounter;
        showCounter = 0;

        this.nearEventsToShow = amount;

        this.moreNearEvents = false;

        this.nearEvents.forEach((event) => {
          showEvent = this.matchesAllFilters(event);

          if (showEvent) {
            showCounter++;
            event.classList.remove("hide");
          } else {
            event.classList.add("hide");
          }

          if (
            showCounter > this.nearEventsToShow &&
            event.classList.contains("hide") == false
          ) {
            this.moreNearEvents = true;
            event.classList.add("hide");
          }
        });

        this.nearEventCounter = showCounter;
        this.$refs.weeklist.classList.remove("hide");

        if (showCounter == 0) {
          this.filters.forEach((filter) => {
            if (filter.type == "date") {
              this.$refs.weeklist.classList.add("hide");
              return;
            }
          });
        }
      },
      matchesAllFilters(event) {
        return (
          this.matchesFilter(event, "location", "data-location") &&
          this.matchesFilter(event, "category", "data-categories") &&
          (this.matchesFilter(event, "date", "data-date-start") ||
            this.matchesFilter(event, "date", "data-date-end"))
        );
      },
      matchesFilter(event, filterType, attribute) {
        let results = this.filters.filter((f) => f.type == filterType);

        if (results.length == 0) {
          return true;
        }

        let value = event.getAttribute(attribute);

        return results.findIndex((r) => value.includes(r.name)) >= 0;
      },
      toggleFilter() {
        this.showMoreFilters = !this.showMoreFilters;
      },
      carouselRight() {
        this.moveCarousel("right");
      },
      carouselLeft() {
        this.moveCarousel("left");
      },
      moveCarousel(direction) {
        if (direction == "right") {
          if (this.carouselTranslation > -200) this.carouselTranslation -= 40;
        } else {
          if (this.carouselTranslation < 0) this.carouselTranslation += 40;
        }
      },
      showMoreNearEvents(amount) {
        this.applyAllFilters(this.nearEventsToShow + amount);
      },
      showMoreEvents(amount) {
        this.applyAllFilters(this.eventsToShow + amount);
      },
    },
    computed: {
      carousel() {
        return (
          "transform: translate3d(" + this.carouselTranslation + "px, 0px, 0px)"
        );
      },
    },
    mounted() {
      if (this.$refs.preview) {
        return;
      }
      
      let tempLocations = Array();
      let getAllEvents = this.$refs.events.querySelectorAll(".event-wrapper");
      this.events = getAllEvents;

      getAllEvents.forEach((current) => {
        let addLocation = true;
        tempLocations.forEach((location) => {
          if (location.name == current.getAttribute("data-location")) {
            addLocation = false;
            return;
          }
        });
        if (addLocation) {
          tempLocations.push({
            name: current.getAttribute("data-location"),
            slug: current.getAttribute("data-location"),
          });
        }
      });

      getNearEvents = this.$refs.nearevents.querySelectorAll(".event-wrapper");
      this.nearEvents = getNearEvents;

      let i = 0;
      this.nearEvents.forEach((current) => {
        let addLocation = true;
        tempLocations.forEach((location) => {
          if (location.name == current.getAttribute("data-location")) {
            addLocation = false;
            return;
          }
        });
        if (addLocation) {
          tempLocations.push({
            name: current.getAttribute("data-location"),
            slug: current.getAttribute("data-location"),
          });
        }
        i++;
      });

      this.locations = tempLocations;
      
      let monthNames = [];
      if (this.lang == "en") {
        monthNames = [
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
      } else if (this.lang == "ar") {
        monthNames = [
          "ديسمبر",
          "نوفمبر",
          "أكتوبر",
          "سبتمبر",
          "أغسطس",
          "يوليو",
          "يونيو",
          "مايو",
          "أبريل",
          "مارس",
          "فبراير",
          "يناير",
        ];
      }

      let today = new Date();
      let currentYear = today.getFullYear();
      let currentMonth = today.getMonth();
      // let currentDate = today.getDate();

      // console.log(this.currentDate + "/" + this.currentMonth + "/" + this.currentYear);

      monthCounter = currentMonth;
      yearCounter = currentYear;
      for (i = 0; i < 6; i++) {
        this.months[i] = {
          month: monthNames[monthCounter],
          year: yearCounter,
          slug: monthNames[monthCounter] + "-" + yearCounter,
        };
        monthCounter++;

        if (monthCounter > 11) {
          monthCounter = 0;
          yearCounter++;
        }
      }

      this.eventlist.forEach(event => {
        event.categories.forEach(category => {
          if(!this.availableCategories.includes(category.slug)) {
            this.availableCategories.push(category.slug);
          }
        })
        if(!this.availableDates.includes(event.startdate[1].substring(0,3))) {
          this.availableDates.push(event.startdate[1].substring(0,3));
        }
        if(!this.availableLocations.includes(event.location.post_title)) {
          this.availableLocations.push(event.location.post_title);
        }
      })

      this.categories = this.categories.filter(category => this.availableCategories.includes(category.slug));
      this.months = this.months.filter(month => this.availableDates.includes(month.month))
      this.locations = this.locations.filter(location => this.availableLocations.includes(location.name))

      this.applyAllFilters(4);

      this.nearEvents.forEach(event => {

      })
    },
  });
});
