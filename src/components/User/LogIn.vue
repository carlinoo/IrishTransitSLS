<template>
  <v-flex xs12 sm6 offset-sm3 back>

    <br>

    <v-progress-linear v-if="loader.show" :indeterminate="true"></v-progress-linear>


    <!-- Alert -->
    <v-alert :type="alert.type" dismissible v-model="alert.show">
      {{ alert.text }}
    </v-alert>


    <br>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Log In</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
      label="Username"
      v-model="username"
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
    ></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="login" flat color="blue darken-3">Log In</v-btn>
          <v-btn v-on:click="goRegister" flat color="grey" class="right">Register</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
      :timeout="2000"
      :top="true"
      :right="true"
      :multi-line="true"
      :vertical="true"
      v-model="snackbar.show"
    > {{ snackbar.text }} <v-btn flat color="pink" @click.native="snackbar.show = false">Close</v-btn></v-snackbar>
    </v-flex>
</template>



<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        snackbar: {
          text: '',
          show: false
        },
        alert: {
          text: "",
          show: false,
          type: "success"
        },
        loader: {
          show: false
        }
      }
    },
    created() {

    },
    methods: {
      login: function() {

        this.loader.show = true;
        this.alert.show = false;

        this.login_user(this.username, this.password, is_signed => {
          if (is_signed) {
            this.snackbar.text = "Successfully logged in";
            this.snackbar.show = true;
            this.alert.text = "Successfully logged in";
            this.alert.type = "success";
            this.alert.show = true;
            this.$router.push('/');
          } else {
            // Show alert
            this.alert.text = "Incorrect username or password";
            this.alert.type = "error";
            this.alert.show = true;
          }

          this.loader.show = false;
        });

      },

      goRegister() {
        this.$router.push('/signup');
      }
    }
  }
</script>

<style media="screen" >
  .content {
    background-color: #C9D3D8;
  }

</style>
