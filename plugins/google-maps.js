import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAQNW2ZqBLEbgT6W16RFnxRhhPu99CiLE4',
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})
