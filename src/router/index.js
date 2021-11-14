import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EventsAndScenicSpot from '../views/EventsAndScenicSpot.vue'
import FoodAndHotel from '../views/FoodAndHotel.vue'
import Bus from '../views/Bus.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/EventsAndScenicSpot',
    component: EventsAndScenicSpot
  },
  {
    path: '/FoodAndHotel',
    component: FoodAndHotel
  },
  {
    path: '/Bus',
    component: Bus
  },
  {
    path: '/Search',
    component: Search
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
