import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/details/:id',
    name: 'Details',
    props: true,
    component: () => import('../views/WeatherDetails.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
