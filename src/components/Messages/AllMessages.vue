<template>
  <div>
    <!--  For the list of users -->
    <v-flex xs12 sm6 offset-sm3>
      <v-list two-line>
        <template v-for="(item, index) in items.slice(0, 6)">
          <v-subheader v-if="item.header" :key="item.header">All Messages</v-subheader>
          <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
          <v-list-tile avatar v-else @click="" :key="item.title">
            <v-list-tile-avatar>
              <img :src="item.avatar" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title><span class='text--primary'>{{ item.from }}</span>: {{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
  </v-flex>
  </div>
</template>




<script>

  export default {
    data() {
      return {
        items: [
          { header: 'Today' },
          { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', from: "Ali Connors", subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ', from: "Me", subtitle: "Wish I could come, but I'm out of town this weekend." },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', from: "Sandra Adams", subtitle: "Do you have Paris recommendations? Have you ever been?" },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/4.jpg', title: 'Birthday gift', from: "Trevor Hansen", subtitle: "Have any ideas about what we should get Heidi for her birthday?" },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/5.jpg', title: 'Recipe to try', from: "Britta Holt", subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
        ]
      }
    },

    created() {
      var chat = firebase.database().ref('chat');

      var rooms = chat.child('room_names');


      // Create a new ref and log it’s push key
      rooms.on('value', function (snap) {
       console.log(snap.val()); // Keep the local user object synced with the Firebase userRef
      });
    }
  }

</script>





<style>

</style>
