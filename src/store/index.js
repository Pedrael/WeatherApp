import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    citiesData: [],
    APIkey: "c019ef58a4ee6f4f143f7fc5e297a153"
  },
  mutations: {
    removeCity (state, index) {
    state.citiesData.splice(index, 1)
    },
    addCity (state, city) {
      state.citiesData.push(city)
    },
    // updateCity (state, args) { // save changes in city
    // args[0] - object, args[1] - id in array
    // Object.assign(state.citiesData[args[1]], args[0], { // copy object
    //   name: args[0].name,
    //   todos: JSON.parse(JSON.stringify(args[0].todos))
    // })
    //}
  },
  actions: {
    addCityFromAPI: async (context, city) => {
      let {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+context.getters.getKey+"")
      context.commit('addCity', data)
    }
  },
  getters: {
    getCities: (state) => { return state.citiesData },
    getKey: (state) => { return state.APIkey }
  },
  modules: {
  }
})
