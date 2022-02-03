window.addEventListener("DOMContentLoaded", () => {

  Vue.component("block-pastnewsletters", {
    data: function () {
      return {
        newsletter_objects: [],
        offset_newsletter: 4,
        load_number: 3,
       };
    },
    props: { },
    methods: {
      gotonews(){
        console.log(document.getElementById('newsletter-card'));
        var card_object = document.getElementById('newsletter-card');
        var y = card_object.getBoundingClientRect().y + parseInt(window.getComputedStyle(card_object, null).getPropertyValue('padding-top'));

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        if(!card_object.classList.contains('flipped'))
        {
          card_object.classList.add('flipped');
        }
      },
      loadmore(){
        this.offset_newsletter = this.offset_newsletter + this.load_number;
        this.displaynewsletter();
      },
      displaynewsletter() {
        for(var i = 0; i < this.newsletter_objects.length; i++)
        {
          if(i >= this.offset_newsletter)
          {
            this.newsletter_objects[i].style.display = 'none';
          } else 
          {
            this.newsletter_objects[i].style.display = 'flex';
          }
        }
        if(this.offset_newsletter >= this.newsletter_objects.length)
        {
          this.$refs.newsletterloadmore.style.display = "none";
        }
      }
     },
    mounted() { 
      this.newsletter_objects = document.getElementsByClassName('news-wrapper-container');
      this.displaynewsletter();
    },
  });
});
