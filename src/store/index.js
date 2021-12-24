import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    citiesData: [],
    detailedData: {},
    APIkey: "c019ef58a4ee6f4f143f7fc5e297a153"
  },
  mutations: {
    removeCity (state, index) {
    state.citiesData.splice(index, 1)
    },
    addCity (state, city) {
      state.citiesData.push(city)
    },
    updateCity (state, APIdata) { // save changes in city
      const index = state.citiesData.findIndex((cityData => cityData.name == APIdata.name))
      state.citiesData[index] = { ...APIdata }
    },
    setDetailedCity (state, data) {
      state.detailedData = { ...data }
    }
  },
  actions: {
    addCityFromAPI: async (context, city) => {
      let {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+context.getters.getKey)
      context.commit('addCity', data)
    },
    refreshCityFromAPI: async (context, city) => {
      let {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+context.getters.getKey)
      context.commit('updateCity', data)
    },
    getDetailedDataFromAPI: async (context, params) => {
      let {data} = await axios.get("https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,daily,alerts&lat="+params.lat+"&lon="+params.lon+"&units=metric&appid="+context.getters.getKey)
      context.commit('setDetailedCity', data)
    }
  },
  getters: {
    getCities: (state) => { return state.citiesData },
    getKey: (state) => { return state.APIkey },
    getDetailedData: (state) => { return state.detailedData }
  },
  modules: {
  }
})
