<template lang="html"> <!-- city item -->
  <div class="card-body">

    <h2 class="name">{{cityName}}</h2>
    <h2 class="temperature">{{cityWeather}}</h2>

  </div>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    cityName: String,
    cityWeather: Number,
    index: Number
  },
  methods: {
    // removeNote: function(index) {
    //   this.$emit('remove-note', index) // generating remote-note event
    // },
    // gotoNote: function(index) {
    //   this.$router.push('/edit/'+index) // routes to edit note page
    // }
  }
}
</script>
