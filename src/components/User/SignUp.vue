<template>
  <v-flex xs12 sm6 offset-sm3 back>
    <br><br>
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
          <v-btn v-on:click="signup" flat color="blue darken-3">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    signup: function() {

      this.register_user(this.email, this.username, this.password, function(result) {
        if (result === false) {
          console.log("Error Signing Up");
          return;
        }

        console.log(result);
      });
    }
  }
}
</script>
