import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ScenicSpot from '../views/ScenicSpot.vue'
import Food from '../views/Food.vue'
import Bus from '../views/Bus.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/ScenicSpot',
    component: ScenicSpot
  },
  {
    path: '/Food',
    component: Food
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
