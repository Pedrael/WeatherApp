import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import createPersistedState from "vuex-persistedstate" // plugin for vuex local storage

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    citiesData: [], // array of cities objects with weather data
    detailedData: {}, // detailed weather data of selected city, used for WeatherDetails.vue
    APIkey: "c019ef58a4ee6f4f143f7fc5e297a153"
  },
  mutations: {
    removeCity (state, index) { // remove city using index of array
    state.citiesData.splice(index, 1)
    },
    addCity (state, city) { // add city object got from API call to array
      state.citiesData.push(city)
    },
    updateCity (state, APIdata) { // save changes in city by means of finding city by name and replacing with new data
      const index = state.citiesData.findIndex((cityData => cityData.name == APIdata.name))
      state.citiesData[index] = { ...APIdata }
    },
    setDetailedCity (state, data) { // set detailed data
      state.detailedData = { ...data }
    }
  },
  actions: {
    addCityFromAPI: async (context, city) => { // API call using city name
      await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+context.getters.getKey).catch().then(({data}) => {
        context.commit('addCity', data)
      })
    },
    refreshCityFromAPI: async (context, city) => { // API call using city name but refresh data
      let {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+context.getters.getKey)
      context.commit('updateCity', data)
    },
    getDetailedDataFromAPI: async (context, params) => { // API call of detailed data using coordinates of place. Coordinates are taken from usual city name API call
      let {data} = await axios.get("https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,daily,alerts&lat="+params.lat+"&lon="+params.lon+"&units=metric&appid="+context.getters.getKey)
      context.commit('setDetailedCity', data)
    },
  },
  getters: {
    getCities: (state) => { return state.citiesData },
    getKey: (state) => { return state.APIkey },
    getDetailedData: (state) => { return state.detailedData }
  },
  plugins: [createPersistedState()], // plugin for vuex local storage
})
