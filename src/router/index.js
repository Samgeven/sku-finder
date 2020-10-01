import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../components/Search.vue'
import Results from '../components/Results.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Search
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('access-token');

  if (authRequired && !loggedIn) {
      return next('/login');
  }

  next();
})

export default router
