import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import { useStore } from '@/store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const loading = ElLoading.service()
  setTimeout(() => {
    loading.close()
  }, 500)

  const store = useStore()
  if (to.name !== 'login' && store.isLogin == false) {
    next('/login')
  } else if (to.name === 'login' && store.isLogin == true) {
    next('/')
  } else if (to.name === 'dictation' && from.name !== 'start') {
    next('/')
  } else {
    next()
  }
})

export default router
