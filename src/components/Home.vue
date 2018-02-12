<template>

</template>

<script>
  export default {
    data() {
      return {

      }
    },

    created() {
      this.user_signed_in(function (is_signed_in) {
        if (!is_signed_in) {
          // window.location = "/login";
        }

        console.log(is_signed_in);
      });
    }
  }
</script>
