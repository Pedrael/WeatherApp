<template lang="html"> <!-- city item -->
  <div class="card-body" @click.stop = "isVisible = !isVisible">

    <h2 class="name">{{cityName}}</h2>
    <h2 class="temperature">{{cityWeather}} °C</h2>

    <div class="hidden-container" v-if="isVisible">
      <div class="flex ai-c jc-sb row">
        <button class="small-button" @click.stop = "refreshCard(cityName)">
          <div class="img-wrap">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"/>
          </div>
        </button>
        <button class="button" @click.stop = "gotoDetails(cityName)">
          Details
        </button>
        <button class="small-button" @click.stop = "removeCard(index)">
          <div class="img-wrap">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png"/>
          </div>
        </button>
      </div>
    </div>

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
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    gotoDetails: function(name) {
      this.$emit('goto-details', name)
    },
    refreshCard: function(name) {
      this.$emit('refresh-card', name)
    },
    removeCard: function(index) {
      this.$store.commit('removeCity', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #2a2a2e;
  border-radius: 1rem;
  margin: 2rem;
  padding: 2rem;
  cursor: pointer;
  width: 500px;

  h2 {
    color: #d0d0d0;
  }

  .img-wrap {
    width: 25px;
    height: 25px;
    background: none;
  }
}
</style>
