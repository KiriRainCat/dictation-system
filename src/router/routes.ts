import HomeView from '../views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/list/:listName',
    name: 'list',
    component: () => import('../views/DictationListView.vue'),
  },
  {
    path: '/start/:listName',
    name: 'start',
    component: () => import('../views/DictationStartView.vue'),
  },
  {
    path: '/dictation',
    name: 'dictation',
    component: () => import('../views/DictationView.vue'),
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/ResultView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AuthView.vue'),
  },
]
