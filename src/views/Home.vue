<template>
  <div class="home">

    <CityCard v-for="(card) in cards"
    v-bind:key = "card.id"
    :cityName = "card.name"
    :cityWeather = "card.main.temp"
    :index = "card.id"
    v-on:click.native = "gotoCard(card.name)"
    />

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
      initialCities: ["Kharkiv", "Kyiv", "Toronto"]
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
    gotoCard: function(index) {
      this.$router.push({path: '/details/'+index}) // routes to card
    },
    // getCityById: function(index) {
    //   return this.cards.filter(obj => { return obj.id = index })
    // }
  }
}
</script>
