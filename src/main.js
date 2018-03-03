import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from './router'
import VueResource from 'vue-resource'
import AsyncComputed from 'vue-async-computed'

Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(AsyncComputed);



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {

    // Check if the user s signed in,
    // if not, go to /login
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        next();
      } else {
        next({
          path:'/login'
        })
      }
    });

  } else {
    // Users cannot see sessions paths when they are signed in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        next({
          path:'/'
        });
      } else {
        next();
      }
    });

  }
});



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
