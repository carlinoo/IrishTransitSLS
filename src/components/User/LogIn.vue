<template>
  <v-flex xs12 sm6 offset-sm3 back>
    <br><br>
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
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    created() {
      debugger;
      // If user is signed in => redirect to home
      this.user_signed_in(function(is_signed_in) {
        if (is_signed_in) {
          // this.$router.push('/');
          window.location  = "/";
        }
      });

    },
    methods: {
      login: function() {
        this.login_user(this.username, this.password);

        if (this.user_signed_in()) {
          this.$router.push('/');
        }
        this.$router.push('/');
      }
    }
  }
</script>

<style media="screen" >
  .content {
    background-color: #C9D3D8;
  }

</style>
