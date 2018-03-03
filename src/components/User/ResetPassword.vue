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
            <h3 class="headline mb-0">Reset Password</h3>
          </div>
        </v-card-title>
        <v-card-text>
        <v-text-field
          label="Code"
          v-model="code"
        ></v-text-field>
        <v-text-field
          label="New Password"
          v-model="password"
          type="password"
        ></v-text-field>
        <v-text-field
          label="Repeat Password"
          v-model="repeat_password"
          type="password"
        ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="reset_password" flat color="blue darken-3">Continue</v-btn>
          <v-btn v-on:click="$router.push('/login')" flat color="grey">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  data() {
    return {
      code: '',
      password: '',
      repeat_password: '',
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
  created() {
    this.code = this.$route.query.oobCode;
  },
  methods: {
    reset_password: function() {

      // Show loader and hide alert
      this.loader.show = true;
      this.alert.show = false;

      var vm = this;

      // Check if both password are the same
      if (this.password !== this.repeat_password) {
        vm.alert.text = "Passwords do not match.";
        vm.alert.type = "error";
        vm.alert.show = true;
        return;
      }


      firebase.auth().confirmPasswordReset(this.code, this.password)
      .then(function() {
        // Password reset email sent.
        vm.alert.text = "Congratulations! Password has been set";
        vm.alert.type = "success";
        vm.alert.show = true;
      })
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
