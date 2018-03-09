<template>
  <div>
    <!--  For the list of users -->
    <v-flex xs12 sm6 offset-sm3>
      <v-list two-line subheader>
          <v-subheader inset>All Messages</v-subheader>
          <v-list-tile avatar v-for="item in items" :key="item.id" @click="go_to_message(item.id)">
            <v-list-tile-avatar>
              <v-icon class="grey lighten-1 white--text">fingerprint</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.last_message }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
  </v-flex>
  </div>
</template>




<script>

  export default {
    data() {
      return {
        items: [

        ]
      }
    },

    methods: {
      go_to_message(id) {
        this.$router.push("message/" + id);
      }
    },


    created() {
      var chat = firebase.database().ref('chat');

      var rooms = chat.child('room_names');
      var uid = firebase.database().uid;

      // Create a new ref and log it’s push key
      rooms.on('value', (snap) => {
       this.items = snap.val();
       console.log(snap.val());
      });

    }
  }

</script>





<style>

</style>
