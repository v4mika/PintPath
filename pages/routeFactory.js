import { MapElementFactory, GmapApi } from 'vue2-google-maps'

const RouteFactory = MapElementFactory({
  name: 'route',
  ctr: function (options) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
      map: options.map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: options.color,
        strokeOpacity: options.opacity,
        strokeWeight: options.weight
      }
    });

    const request = {
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode
    };

    directionsService.route(request, function (result, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(result);
      }
    });

    return directionsDisplay;
  }
});

export default {
  components: {
    'gmap-route': RouteFactory
  },
  mounted () {
    GmapApi().then(() => {
      this.addRoute();
    });
  },
  methods: {
    addRoute () {
      this.$refs.map.$mapObject.setOptions({
        zoom: 14,
        center: this.origin
      });
    }
  },
  data () {
    return {
      origin: { lat: 37.772, lng: -122.214 },
      destination: { lat: 21.291, lng: -157.821 },
      travelMode: 'DRIVING'
    };
  }
};
