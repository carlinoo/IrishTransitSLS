<template>
  <v-flex xs12 sm6 offset-sm3 back>

    <br>
    <!-- Loader -->
    <v-progress-linear v-if="loader.show" :indeterminate="true"></v-progress-linear>

    <!-- Alert -->
    <v-alert :type="alert.type" dismissible v-model="alert.show">
      {{ alert.text }}
    </v-alert>


    <br>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Sign Up</h3>
          </div>
        </v-card-title>
        <v-card-text>

        <v-text-field
          label="Email"
          v-model="email"
          type="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
        ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="signup" flat color="blue darken-3">Sign Up</v-btn>
          <v-btn v-on:click="$router.push('/login')" flat color="grey">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      email: '',
      loader: {
        show: false
      },
      alert: {
        show: false,
        type: 'success',
        text: ''
      }
    }
  },
  methods: {
    signup: function() {

      // Show loader and hide alert
      this.loader.show = true;
      this.alert.show = false;

      var vm = this;

      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        vm.alert.text = errorMessage;
        vm.alert.type = "error";
        vm.alert.show = true;

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
