<template>
  <div>

  </div>
</template>



<script>
  export default {
    data() {
      return {
        bus_stops: [],
        bus_routes: []
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
