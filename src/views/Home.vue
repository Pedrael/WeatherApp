<template>
  <div class="home">

    <CityCard v-for="(card, index) in cards"
    v-bind:key = "index"
    :cityName = "card.name"
    :cityWeather = "card.main.temp"
    :index = index
    v-on:goto-details = "gotoCard(card.name, index)"
    v-on:refresh-card = "refreshCard(card.name)"
    v-on:click.native = "refreshCard(card.name)"
    />

    <div class="flex jc-sb ai-c add-wrap">
      <input type="text" name="" placeholder="Insert City here" v-model="typedCity">
      <button class="button" @click = addCard>Add</button>
    </div>

    <div class="popup" v-if="isPopup"><h2>{{messageInfo}}</h2></div>

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
      initialCities: ["Kharkiv", "Kyiv", "Toronto"],
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
  mounted: function() {
    if(this.$store.getters.getCities.length == 0)
    this.initialCities.forEach((city) => {
      this.$store.dispatch('addCityFromAPI', city)
    })
  },
  methods: {
    gotoCard: function(cityName, index) {
        this.$router.push({
            path: '/details/'+cityName, query: {
            lon: this.cards[index].coord.lon,
            lat: this.cards[index].coord.lat
          }
        })
      }, // routes to card
      refreshCard: function(city) {
        this.$store.dispatch('refreshCityFromAPI', city)
        console.log("Refreshed")
      },
      showPopup: function(secs, message) {
        this.messageInfo = message
        this.isPopup = true
        setTimeout(() => {
          this.isPopup = false
        }, secs)
      },
      addCard: function() {
        if(this.cards.find ((city => this.typedCity == city.name)) == undefined) {
          this.$store.dispatch('addCityFromAPI', this.typedCity).catch(()=>{
            this.showPopup(1500, "This city doesn`t exist!")
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
  .home {
    overflow: hidden;
  }
  .add-wrap {
    background: #2a2a2e;
    max-width: 500px;
    border-radius: 1rem;
    margin: 2rem;
    padding: 2rem;
  }
  .popup {
    background: #2a2a2e;
    width: 100%;
    padding: 2rem;
  }
</style>
