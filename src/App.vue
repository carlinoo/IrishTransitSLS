<template>
  <v-app>
    <!-- <v-header></v-header> -->
    <v-toolbar app color="blue darken-3"
      dark
      clipped-left
      fixed>
      <v-toolbar-title class="ml-0 pl-3">
        <span v-on:click="$router.push('/')" style="cursor:pointer" class="hidden-xss-only">IrishTransit</span>
      </v-toolbar-title>

      <div class="d-flex align-center" style="margin-left: auto">

        <v-btn v-if="loggedin" icon v-on:click="$router.push('/profile')">
          <v-icon href="/">person</v-icon>
        </v-btn>

        <v-btn v-if="loggedin" v-on:click="$router.push('EditProfile')" icon >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn v-if="loggedin" icon v-on:click="sign_out()">
          <v-icon href="/">exit_to_app</v-icon>
        </v-btn>

        <v-btn v-if="!loggedin" icon v-on:click="$router.push('/login')">
          <v-icon href="/">power_settings_new</v-icon>
        </v-btn>

        <v-btn v-if="!loggedin" icon v-on:click="$router.push('/signup')">
          <v-icon href="/">person_add</v-icon>
        </v-btn>
      </div>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>

      </v-container>
    </v-content>
    <v-footer app></v-footer>

  </v-app>
</template>


<script>

import Header from './components/Layout/Header';

  export default {
    data () {
      return {
        loggedin: false
      }
    },
    methods: {
      sign_out: function() {
        firebase.auth().signOut();
        this.loggedin = false;
        this.$router.push('/login');
      }
    },
    created() {
      var vm = this;

      // If the user is logged in, show the icon
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          vm.loggedin = true;
        } else {
          vm.loggedin = false;
        }
      });

    },

    components: {
      'v-header': Header
    }
  }
</script>
