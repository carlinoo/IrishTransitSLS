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
          <!-- <v-text-field
      label="Username"
      v-model="username"
      type="text"
    ></v-text-field>
    <v-text-field
      label="Code"
      v-model="code"
      type="text"
    ></v-text-field> -->
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

    }
  },
  methods: {
    update_profile() {
      
    }
  }
}

</script>



<style>
.content {
  background-color: #C9D3D8;
}
</style>
