<template>
  <div>
    <h3>{{ dog }}</h3>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        dog: ''
      }
    },

    created() {
      var vm = this;

      var usersRef = firebase.database().ref('users/');

      var userRef = usersRef.child(firebase.auth().currentUser.uid);


      // Create a new ref and log it’s push key
      userRef.on('value', function (snap) {
       vm.dog = snap.val(); // Keep the local user object synced with the Firebase userRef
      });

    }
  }
</script>
