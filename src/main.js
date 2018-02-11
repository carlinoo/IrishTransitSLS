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
    user_signed_in: function(callback) {
      return cognito_functions.user_signed_in(callback);
    },
    current_user: function() {
      return cognito_functions.current_user();
    },
    user_sign_out: function() {
      return cognito_functions.user_sign_out();
    },
    register_user: function(email, username, password) {
      return cognito_functions.register_user(email, username, password);
    },
    confirm_user: function(username, password) {
      return cognito_functions.confirm_user(username, password);
    },
    resend_code_user: function(username) {
      return cognito_functions.resend_code_user(username);
    }
  }
})

// 
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//
//     // Check if the user s signed in,
//     // if not, go to /login
//     cognito_functions.user_signed_in(function (is_signed_in) {
//       console.log("ssddf");
//       if (!is_signed_in) {
//         next({
//           path: '/login'
//         })
//       } else {
//         next({
//           path: '/'
//         })
//       }
//     });
//
//
//   } else {
//     next()
//   }
// });

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
