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
      label="Email"
      v-model="email"
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
    ></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="login" flat color="blue darken-3">Log In</v-btn>
          <v-btn v-on:click="$router.push('/signup')" flat color="grey" class="right">Register</v-btn>
          <v-btn v-on:click="$router.push('/forgotpassword')" flat color="grey" class="right">Forgot Password?</v-btn>
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
        email: '',
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
    methods: {
      login: function() {

        this.loader.show = true;
        this.alert.show = false;

        var vm = this;

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          // If the password is wrong, show an error message
          if (errorCode === 'auth/wrong-password') {
            vm.alert.text = "Wrong Password";
            vm.alert.type = "error";
            vm.alert.show = true;

          } else {
            vm.alert.text = errorMessage;
            vm.alert.type = "error";
            vm.alert.show = true;
          }
        });

        this.loader.show = false;
      }
    }
  }
</script>

<style media="screen" >
  .content {
    background-color: #C9D3D8;
  }

</style>
