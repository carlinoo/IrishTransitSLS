import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from './router'
import cognito_functions from './mixin/cognito_methods'

Vue.use(Vuetify)



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (true) {
      cognito_functions.login_user();
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
