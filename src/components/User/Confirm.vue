<template>
  <v-flex xs12 sm6 offset-sm3 back>
    <br><br>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Confirm Email</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
      label="Email Address"
      v-model="email"
      type="email"
    ></v-text-field>
    <v-text-field
      label="Code"
      v-model="code"
      type="text"
    ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="confirm_code" flat color="blue darken-3">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
  export default {
    data() {
      return {
        email = '',
        code = ''
      }
    },
    methods: {
      confirm_code: function() {
        
      }
    }

  }
</script>
