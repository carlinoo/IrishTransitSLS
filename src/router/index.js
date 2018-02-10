import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import LogIn from '../components/User/LogIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
      meta: {
        authRequired: false
      }
    }
  ]
})
