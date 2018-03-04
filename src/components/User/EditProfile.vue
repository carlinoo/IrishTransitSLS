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
            disabled
          ></v-text-field>
          <v-text-field
            label="First Name"
            v-model="first_name"
            type="text"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="last_name"
            type="text"
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="phone_number"
            type="text"
          ></v-text-field>
          <v-text-field
            label="age"
            v-model="age"
            type="number"
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
      last_name: '',
      first_name: '',
      age: '',
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

      var usersRef = firebase.database().ref('users');
      var userRef = usersRef.child(firebase.auth().currentUser.uid);

      userRef.set({
        phone_number: this.phone_number,
        first_name: this.first_name,
        last_name: this.last_name,
        age: this.age
      });

      this.loader.show = false;
      this.alert.show = true;
      this.alert.text = "Profile has been updated";
      this.alert.type = "success";
    }
  },



  created() {
    this.loader.show = true;
    var vm = this;

    this.email = firebase.auth().currentUser.email;

    var usersRef = firebase.database().ref('users');
    var userRef = usersRef.child(firebase.auth().currentUser.uid);

    userRef.on('value', function (snap) {
      // If there is no user created
      if (snap.val() == null) {
        vm.loader.show = false;
        return;
      }
     vm.phone_number = snap.val().phone_number;
     vm.first_name = snap.val().first_name;
     vm.last_name = snap.val().last_name;
     vm.age = snap.val().age;
     vm.loader.show = false;
    });
  }
}

</script>



<style>
.content {
  background-color: #C9D3D8;
}
</style>
