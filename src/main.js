import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from './router'
import cognito_functions from './mixin/cognito_methods'

Vue.use(Vuetify)


// Mixing for cognito
Vue.mixin({
  methods: {
    login_user: function (username, password) {
      return cognito_functions.login_user(username, password);
    },
    user_signed_in: function () {
      return cognito_functions.user_signed_in();
    },
    current_user: function () {
      return cognito_functions.current_user();
    }
  }
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (true) {
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
