<template>
  <v-flex xs12 sm6 offset-sm3 back>
    <br>

    <!-- Progress Bar -->
    <v-progress-linear v-if="loader.show" :indeterminate="true"></v-progress-linear>


    <!-- Alert -->
    <v-alert :type="alert.type" dismissible v-model="alert.show">
      {{ alert.text }}
    </v-alert>

    <br>
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
      phone_number: '',
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
    update_profile() {
      // Show progress bar and hide alert
      this.loader.show = true;
      this.alert.show = false;

      // Get attributes and add them to an array
      var attributes = [];
      attributes.push({
        Name: 'email',
        Value: this.email
      });
      attributes.push({
        Name: 'phone_number',
        Value: this.phone_number
      });

      this.userUpdateAttributes(attributes, (success, result) => {
        this.loader.show = false;

        if (success) {
          this.alert.text = "Profile Updated Successfully";
          this.alert.type = "success";
          this.alert.show = true;
        } else {
          this.alert.text = "There's has been an error, please try later";
          this.alert.type = "error";
          this.alert.show = true;
        }
      });
    }
  },
  created() {
    this.current_user((user, err) => {
      if (user == null) {
        return;
      } else {
        console.log(user);
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
