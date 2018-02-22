<template>

</template>

<script>
  export default {
    data() {
      return {

      }
    },

    created() {
      this.$http.get('https://hi0e8on3ef.execute-api.eu-west-1.amazonaws.com/dev')
      .then(response => {
        console.log(response);
      });
    }
  }
</script>
