<template>
  <div>
    <v-flex xs12 sm6 offset-sm3 >
     <v-card class="dublin_bus_search">
         <div>
           <input id="dublin_bus_search" v-model="input" type="text">
         </div>
     </v-card>
   </v-flex>

   <br><br>

   <v-flex xs12 sm6 >
     <v-list>
       <v-list-tile avatar v-for="(name, stop) in bus_stops" @click="">
         <v-list-tile-avatar>
           <v-icon>chat_bubble</v-icon>
          </v-list-tile-avatar>
         <v-list-tile-content>
           <v-list-tile-title>{{ stop }}</v-list-tile-title>
         </v-list-tile-content>
         <v-list-tile-action>
           <v-icon>chat_bubble</v-icon>
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
        bus_stops: [],
        bus_routes: [],
        input: ""
      }
    },

    created() {


      var infoRef = firebase.database().ref('information');

      var BusRoutes = infoRef.child('BusRoutes');

      // Create a new ref and log it’s push key
      BusRoutes.on('value', (snap) => {
       this.bus_routes = snap.val();
      });

      var BusStops = infoRef.child('BusStops');

      // Create a new ref and log it’s push key
      BusStops.on('value', (snap) => {
       this.bus_stops = snap.val();
      });

    },

    methods: {

      setBusRoutes() {
        var vm = this;


        this.$http.get(this.corsAnywhere("https://data.dublinked.ie/cgi-bin/rtpi/routelistinformation")).then(response => {

          response.body.results.forEach(item => {

            this.$http.get(this.corsAnywhere("https://data.dublinked.ie/cgi-bin/rtpi/routeinformation?routeid=" + item.route + "&operator=" + item.operator)).then(data => {
              console.log(data.body);
              var infoRef = firebase.database().ref('information');

              var BusRoutes = infoRef.child('BusRoutes');

              if (data.body.results.length != 0) {
                BusRoutes.child(item.route).set({
                  operator: item.operator,
                  info: data.body.results[0].origin + ' / ' + data.body.results[0].destination,
                  irish_info: data.body.results[0].originlocalized + ' / ' + data.body.results[0].destinationlocalized
                });
              }
            });
          });

        });
      },

      setBusStops() {
        var vm = this;
        var infoRef = firebase.database().ref('information');

        var BusStops = infoRef.child('BusStops');

        this.$http.get(this.corsAnywhere("https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation")).then(response => {

          response.body.results.forEach(item => {

            BusStops.child(item.stopid).set({
              name: item.shortname,
              irish_name: item.shortnamelocalized,
              longitude: item.longitude,
              latitude: item.latitude
            });
            console.log(item);
          });

        });

      }
    }
  }
</script>


<style media="screen" scoped>
  .dublin_bus_search {
    margin-top: 14px !important;
  }


  #dublin_bus_search {
    padding-top: -7px;
    width: 100%;
    height: 100%;
    font-size: 24px;
    padding-left: 7px;
    text-align: center;
    color: $primary-color;
    font-weight: bold;
    border: 0;
  }

  #dublin_bus_search::-webkit-input-placeholder {
    font-weight: normal;
  }

  .dublin_bus_content {
    padding: 0 !important;
    height: 40px;
  }

</style>
