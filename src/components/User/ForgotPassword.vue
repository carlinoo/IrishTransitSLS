<template>
  <div>
  <v-flex xs12 sm6 offset-sm3 back>
    <br><br>
      <v-card>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Forgot Password</h3>
          </div>
        </v-card-title>

        <v-card-text>
          <v-stepper v-model="element">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="element > 1">Enter Username</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="element > 2">Verification</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Completed</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">

                <br>
                <v-text-field
                  label="Username"
                  v-model="username"
                ></v-text-field>
                <br>

                <v-btn color="primary" @click="forgotPassword">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <br>
                <v-text-field
                  label="Verification Code"
                  v-model="verificationCode"
                ></v-text-field>
                <v-text-field
                  label="New Password"
                  v-model="newPassword"
                  type="password"
                ></v-text-field>
                <br>
                <v-btn color="primary" @click="VerifyCode">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="">Continue</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>

        <v-card-actions>
          <!-- <v-btn v-on:click="confirm_code" flat color="blue darken-3">Go</v-btn>
          <v-btn v-on:click="resend_code" flat color="blue darken-3">Resend Code</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>



<script>

export default {
  data() {
    return {
      username: '',
      verificationCode: '',
      newPassword: '',
      element: 1
    }
  },
  methods: {
    forgotPassword() {
      this.userForgotPassword(this.username, (success, data) => {
        if (success) {
          this.element = 2;
        } else {
          console.log(data);
        }
      });
    },

    VerifyCode() {
      this.confirmResetPassword(this.username, this.verificationCode, this.newPassword, (success, data) => {
        if (success) {
          this.element = 3;
        } else {
          console.log(data);
          // Display errors
        }
      });
    }
  }
}

</script>



<style media="screen" >
  .content {
    background-color: #C9D3D8;
  }

</style>
