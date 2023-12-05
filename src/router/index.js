import { createRouter, createWebHistory } from 'vue-router'
import MemoryGame from '../views/MemoryGameView.vue'
 

const routes = [
 
  {
    path: '/',
    name: 'home',
    meta: { title: 'Memory-Game' },
    component: MemoryGame
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


// router.afterEach((to) => {
//   // to = vue d'arrivée
//   // from = vue de départ
//   // Definir le title de chaque View
//   document.title = to.meta.title
// })


export default router
