<template lang="html"> <!-- city item -->
  <div class="card-body">

    <h2 class="name">{{cityName}}</h2>
    <h2 class="temperature">{{cityWeather}}</h2>
    <h2>{{index}}</h2>

  </div>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    cityName: String,
    cityWeather: Number,
    index: Number,
  },
}
</script>

<style lang="scss" scoped>
.card-body {
  display: flex;
  justify-content: space-around;
  background-color: #2a2a2e;
  border-radius: 16px;
  margin: 20px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: #5a5a5e;
  }

  h2 {
    color: #d0d0d0;
  }
}
</style>
