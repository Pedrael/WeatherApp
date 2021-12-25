<template lang="html"> <!-- city item -->
  <div class="layout">
    <div class="card-body"  v-if="isVisible">
      <h2>{{$route.params.id}}</h2>

      <div class="flex ai-c jc-sb row">
        <p><strong>Temperature:</strong> {{detailedData.current.temp}}</p>
        <p><strong>Feels like:</strong> {{detailedData.current.feels_like}}</p>
      </div>

      <div class="flex ai-c jc-sb row">
        <p>{{detailedData.current.weather[0].description}}</p>
        <div class="flex jc-c">
          <div class="img-wrap">
            <img :src="getImgUrl(detailedData.current.weather[0].icon)" v-bind:alt="detailedData.current.weather[0].icon">
          </div>
        </div>
      </div>

      <div class="flex ai-c jc-c row temperature-row">
        <div class="temp-wrap flex ai-c jc-c" v-for="(hour, index) in detailedData.hourly.slice(42, 48)"
        v-bind:key = index
        v-bind:style="{ 'margin-bottom': hour.temp*10+'px' }">
          {{hour.temp}}
        </div>
      </div>

      <div class="flex ai-c jc-c row">
        <button class="button" @click="goBack">Back</button>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'WeatherDetails',
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    getImgUrl: function(code) {
      return "http://openweathermap.org/img/wn/" + code + "@2x.png"
    },
    goBack: function() {
      return this.$router.push("/")
    }
  },
  computed: {
    detailedData() {
      return this.$store.getters.getDetailedData
    }
  },
  mounted: function() {
    this.$store.dispatch('getDetailedDataFromAPI', {
      lon: this.$route.query.lon,
      lat: this.$route.query.lat
    }).then(()=>{
      this.isVisible = true
    })
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #2a2a2e;
  border-radius: 16px;
  max-width: 80%;
  width: 500px;
  padding: 1rem;

  .row {
    margin-bottom: 1rem;
    width: 100%;
    @media (max-width: 360px) {
      flex-direction: column;
      p {
        margin-bottom: 10px;
      }
    }
  }

  .img-wrap {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    background: #dfd313;
  }

  .temperature-row {
    min-height: 150px;
  }

  .temp-wrap {
    background: #dfd313;
    color: #2a2a2e;
    padding-top: 5px;
    margin: 1px;
    border-radius: 5px;
    height: 20px;
  }

  h2 {
    color: #fff;
    margin-bottom: 1.8rem;
    margin-top: 2.5rem;
  }

  p {
    color: #d0d0d0;
  }
}
</style>
