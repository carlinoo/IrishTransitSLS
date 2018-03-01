<template>

</template>

<script>
  export default {
    data() {
      return {

      }
    },

    created() {
      this.$http({
         url: 'https://6axn29owrj.execute-api.eu-west-1.amazonaws.com/dev/hello',
         method: 'GET'
      }).then(response => {
        console.log(response);
      });


      // console.log(Vue.http.headers.common);
    }
  }
</script>
