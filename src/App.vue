<template>
  <v-app>
    <!-- <v-header></v-header> -->
    <v-toolbar app color="blue darken-3"
      dark
      clipped-left
      fixed>
      <v-toolbar-title class="ml-0 pl-3">
        <span v-on:click="go_home" style="cursor:pointer" class="hidden-xss-only">WebDep - CoderDojo</span>
      </v-toolbar-title>

      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn v-if="true" href="/" icon >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn v-if="loggedin" icon v-on:click="sign_out()">
          <v-icon href="/">exit_to_app</v-icon>
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
        this.user_sign_out();
        this.loggedin = false;
        this.$router.push('/login');
      },

      go_home() {
        this.$router.push('/');
      }
    },
    created() {
      this.user_signed_in((bool) => this.loggedin = bool);

      this.$http({
         url: 'https://9g52fgy0ze.execute-api.eu-west-1.amazonaws.com/dev',
         method: 'GET'
      }).then(response => {
        console.log(response);
      });


    },
    asyncComputed: {
      logged_in: function() {
        return new Promise((resolve, reject) => {
          this.user_signed_in((bool) => resolve(bool));
        });
      }
    },
    components: {
      'v-header': Header
    }
  }
</script>
