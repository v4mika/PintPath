<template>
  <div class="helloCutie">
    <h1>Pub Crawl App</h1>

    <input type="text" placeholder="Enter location here!" v-model="breed" />
    <button @click="getCatFactAdvanced">Click Me!</button>
    

    <p>{{ catInfo.fact }}</p>
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
      /*const response = await fetch(
        "https://nominatim.openstreetmap.org/search?q=&format=json"
        //`https://catfact.ninja/fact/breed/${this.breed}`


      );*/

     

      const query = `
[out:json][timeout:25];
(
  node["amenity"="bar"](51.5074, -0.1278, 51.5200, -0.1150);
  node["amenity"="pub"](51.5074, -0.1278, 51.5200, -0.1150);
  way["amenity"="bar"](51.5074, -0.1278, 51.5200, -0.1150);
  way["amenity"="pub"](51.5074, -0.1278, 51.5200, -0.1150);
  relation["amenity"="bar"](51.5074, -0.1278, 51.5200, -0.1150);
  relation["amenity"="pub"](51.5074, -0.1278, 51.5200, -0.1150);
);
out body;
>;
out skel qt;
`;

fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: query,
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });


      /*
      
      const bbox = [37.769, 37.819, -122.406, -122.356];
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](bbox);out;`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

      this.catInfo = await response.json();*/
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only, 
    this means if I were to try to style anything outside of this file it wouldn't work! -->
<style scoped>
.helloCutie {
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
