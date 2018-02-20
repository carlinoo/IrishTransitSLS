<template>

</template>

<script>
  export default {
    data() {
      return {

      }
    },

    created() {
      this.is_signed_in(function(is_signed, cognitoUser) {

        if (is_signed) {
          console.log(true, cognitoUser);
          console.log(cognitoUser.storage["CognitoIdentityServiceProvider.7875e8drhne3d1qjqn41gp6q8a.carlinoo.idToken"]);
        } else {
          console.log(false, cognitoUser);
        }
      });
    }
  }
</script>
