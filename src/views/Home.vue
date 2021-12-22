<template>
  <div class="home">

    <CityCard v-for="(card) in cards"
    v-bind:key = "card.id"
    :cityName = "card.name"
    :cityWeather = "card.main.temp"
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

  }
}
</script>
