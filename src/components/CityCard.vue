<template lang="html"> <!-- city item -->
  <div class="card-body" @click.stop = "isVisible = !isVisible">

    <h2 class="name">{{cityName}}</h2>
    <h2 class="temperature">{{cityWeather}} °C</h2>

    <transition name="show-hidden">
      <div class="hidden-container" v-if="isVisible">

        <div class="flex ai-c jc-sb row">
          <h2 class="name">Pressure: {{pressure}}</h2>
          <h2 class="temperature">Humidity: {{humidity}}</h2>
        </div>

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
    </transition>

  </div>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    cityName: String,
    cityWeather: Number,
    index: Number,
    pressure: Number,
    humidity: Number
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: { // emiting methods of parent Home.vue inside child
    gotoDetails: function(name) {
      this.$emit('goto-details', name)
    },
    refreshCard: function(name) {
      this.$emit('refresh-card', name)
    },
    removeCard: function(index) {
      this.isVisible = false
      this.$store.commit('removeCity', index)
    }
  }
}
</script>

<style lang="scss" scoped>

@import "./src/scss/vars.scss";

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: $dark;
  border-radius: 1rem;
  margin: 1rem;
  padding: 2rem;
  cursor: pointer;
  width: 500px;

  h2 {
    color: $light;
  }

  .row {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  .img-wrap {
    width: 25px;
    height: 25px;
    background: none;
  }

  .show-hidden-enter-active, .show-hidden-leave-active {
    transition: all .3s ease;
  }
  .show-hidden-enter, .show-hidden-leave-to
  {
    transform: translateX(-500px);
    opacity: 0;
  }
}
</style>
