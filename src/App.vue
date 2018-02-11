<template>
  <v-app>
    <!-- <v-header></v-header> -->
    <v-toolbar app color="blue darken-3"
      dark
      clipped-left
      fixed>
      <v-toolbar-title class="ml-0 pl-3">
        <span v-on:click="go_home" class="hidden-xs-only">WebDep - CoderDojo</span>
      </v-toolbar-title>

      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn  href="/" icon >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon v-on:click="sign_out()">
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

      }
    },
    methods: {
      sign_out: function() {
        console.log("sdf");
        this.user_sign_out();
        this.$router.push('/login');
      },

      go_home() {
        this.$router.push('/');
      }
    },
    components: {
      'v-header': Header
    }
  }
</script>
