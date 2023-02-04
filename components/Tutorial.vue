<template>
  <div class="pubCrawl">
    <h1>Pub Crawl App</h1>

    <input type="text" placeholder="Enter location here!" v-model="breed" />
    <button @click="getCatFactAdvanced">Click Me!</button>
    

    <pre>{{ catInfo}}</pre>

    <Map></Map>
  </div>


</template>

<script>
 
export default {
  name: 'HelloWorld',
  // data is where we hold component level mutatable data.
  data() {
    return {
      catInfo: '...',
      breed: '',
    };
  },
  methods: {
    async getCatFact() {
      const response = await fetch('https://catfact.ninja/fact');
      this.catInfo = await response.json();
    },
    async getCatFactAdvanced() {
      console.log("Donwloading")
      // this example doesn't work as the API doesn't support it but this is what it may look like if you needed to pass data in the request
      // The user can enter a breed in the input we have in the template, which is then saved to "breed" in data and then we reference that here
     /* console.log("fetchinggggg");
      const response = await fetch(
        'https://nominatim.openstreetmap.org/search?q=fulham&format=json'
        //`https://catfact.ninja/fact/breed/${this.breed}`


      );*/

     
      const lat = 51.4833074
const lon = -0.1996041
const radius = 1609.34;
      const query = `
[out:json][timeout:25];
(
  node(around:${radius},${lat},${lon})["amenity"="bar"];
  node(around:${radius},${lat},${lon})["amenity"="pub"];
  way(around:${radius},${lat},${lon})["amenity"="bar"];
  way(around:${radius},${lat},${lon})["amenity"="pub"];
);
out body;
>;
out skel qt;
`;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: query,
      })
      this.catInfo = await response.json();

      

      
        /*.then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });*/


      /*
      
      const bbox = [37.769, 37.819, -122.406, -122.356];
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](bbox);out;`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

      this.catInfo = await response.json().json();*/
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only, 
    this means if I were to try to style anything outside of this file it wouldn't work! -->
<style scoped>
.pubCrawl {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
p {
  max-width: 300px;
}
button {
  background-color: rgb(224, 47, 47);
  border: transparent;
  border-radius: 2px;
  padding: 4px 10px;

  color: rgb(240, 240, 240);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
