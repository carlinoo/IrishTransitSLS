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

var sha256 = require('js-sha256').sha256;


// mixin to get sha256 method and get encrypted chatroom id
Vue.mixin({
  methods: {
    sha256: function(string) {
      return sha256(string);
    },

    getChatroomID: function(user1, user2) {
      var room = (user1 > user2) ? (user2 + '_' + user1) : (user1 + '_' + user2);
      return sha256(room);
    }
  }
});



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
  sha256: sha256,
  render: h => h(App)
})
