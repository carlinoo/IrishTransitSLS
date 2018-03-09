<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>




<script>

  export default {
    data() {
      return {

      }
    },


    created() {
      // var chat = firebase.database().ref('chat');
      //
      // var messages = chat.child('messages').child(this.$route.params.id);
      //
      // // Create a new ref and log it’s push key
      // chat.on('value', (snap) => {
      //  console.log(snap.val());
      // });

      var chat = firebase.database().ref('chat');

      var rooms = chat.child('messages').child(this.$route.params.id);

      // Create a new ref and log it’s push key
      rooms.on('value', (snap) => {
       console.log(snap.val());
      });
    }
  }

</script>
