<template>
  <v-flex xs12 sm6 offset-sm3 back>
    <br><br>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Edit Profile</h3>
          </div>
        </v-card-title>
        <v-card-text>

          <v-text-field
      label="Email Address"
      v-model="email"
      type="text"
    ></v-text-field>
    <v-text-field
      label="Phone Number"
      v-model="phone_number"
      type="text"
    ></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="update_profile" flat color="blue darken-3">Update Profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>



<script>

export default {
  data() {
    return {
      email: '',
      phone_number: ''
    }
  },
  methods: {
    update_profile() {

    }
  },
  created() {
    this.current_user((user, err) => {
      if (user == null) {
        return;
      } else {
        for (var i = 0; i < user.length; i++) {
          if (user[i].Name == 'email') {
            this.email = user[i].Value;
          } else if (user[i].Name == 'phone_number') {
            this.phone_number = user[i].Value;
          }
        }
      }
    });
  }
}

</script>



<style>
.content {
  background-color: #C9D3D8;
}
</style>
