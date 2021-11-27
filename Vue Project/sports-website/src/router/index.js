import { createRouter, createWebHistory } from 'vue-router'
import Standings from '@/views/Standings.vue'
import Scores from '@/views/Scores.vue'
import Input from '@/views/Input.vue'

const routes = [
  {
    path: '/',
    name: 'Standings',
    component: Standings,
    props: true
  },
  {
    path: '/scores',
    name: 'Scores',
    component: Scores,
    props: true
  },
  {
    path: '/input',
    name: 'Enter a Score',
    component: Input
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
