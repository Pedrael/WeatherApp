<template>
  <div class="home flex jc-c ai-c">

    <CityCard v-for="(card, index) in cards"
    v-bind:key = "index"
    :cityName = "card.name"
    :cityWeather = "card.main.temp"
    :index = index
    :pressure = card.main.pressure
    :humidity = card.main.humidity
    v-on:goto-details = "gotoCard(card.name, index)"
    v-on:refresh-card = "refreshCard(card.name)"
    v-on:click.native = "refreshCard(card.name)"
    />

    <div class="flex jc-sb ai-c add-wrap">
      <input type="text" name="" placeholder="Insert City here" v-model="typedCity">
      <button class="button" @click = addCard>Add</button>
    </div>

    <transition name = "popup-fade">
      <div class="popup" v-if="isPopup"><h2>{{messageInfo}}</h2></div>
    </transition>

  </div>
</template>

<script>
// @ is an alias to /src
import CityCard from '@/components/CityCard.vue'

export default {
  name: 'Home',
  components: {
    CityCard
  },
  data() {
    return {
      initialCities: ["Kharkiv", "Ashdod", "Toronto"],
      typedCity: "",
      isPopup: false,
      messageInfo: ""
    }
  },
  computed: {
    cards() {
      return this.$store.getters.getCities;
    }
  },
  mounted: function() { // comment this if you don`t want spawning cities when you don`t have any data in array
    if(this.$store.getters.getCities.length == 0)
    this.initialCities.forEach((city) => {
      this.$store.dispatch('addCityFromAPI', city)
    })
  },
  methods: {
    gotoCard: function(cityName, index) { // moving to detailed display of weather
        this.$router.push({
            path: '/details/'+cityName, query: {
            lon: this.cards[index].coord.lon,
            lat: this.cards[index].coord.lat
          }
        })
      }, // routes to card
      refreshCard: function(city) {
        this.$store.dispatch('refreshCityFromAPI', city)
      },
      showPopup: function(secs, message) { // information providing popup message
        this.messageInfo = message
        this.isPopup = true
        setTimeout(() => {
          this.isPopup = false
        }, secs)
      },
      addCard: function() { // add user inputed new city
        if(this.cards.find ((city => this.typedCity == city.name)) == undefined) {
          this.$store.dispatch('addCityFromAPI', this.typedCity).catch(()=>{
            this.showPopup(1500, "This city doesn`t exist!")
          }).then(()=>{
            this.typedCity = ""
          })
        }
        else {
          this.showPopup(1500, "This city is already here!")
        }
      }
    },
}
</script>

<style lang="scss" scoped>

@import "./src/scss/vars.scss";

  .home {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
  }
  .add-wrap {
    background: $dark;
    max-width: 500px;
    border-radius: 1rem;
    margin: 2rem;
    padding: 2rem;
  }
  .popup {
    background: $dark;
    width: 100%;
    padding: 2rem;
  }
  .popup-fade-enter-active {
    transition: all .3s ease;
  }
  .popup-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .popup-fade-enter, .popup-fade-leave-to
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
