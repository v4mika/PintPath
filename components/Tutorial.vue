<template>
  <div class="pubCrawl">
    <h1>Pub Crawl App</h1>

    <input type="text" placeholder="Enter location here!" v-model="loc" />
    <button @click="getCatFactAdvanced">Click Me!</button>

    <table>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Selected</th>
      </tr>
      <!-- for every item in publist create a <tr> the key has to be something unique -->
      <tr v-for="(pub, index) in catInfo " :key="index">
        <td>{{ (index += 1) }}</td>
        <td>{{ pub.tags?.name }}</td>
        <td>{{ pub.distance }}</td>
        <td>
          <!-- Here we have a conditional class, which means it only adds the class addedPub if selectedPubs includes pub -->
          <button
            :class="{ addedPub: selectedPubs.includes(pub) }"
            @click="pubToggle(pub)"
          >
            <!-- this logic determines weather a + or - sign is present depending on weather the item is in the list -->
            {{ selectedPubs.includes(pub) ? '-' : '+' }}
          </button>
        </td>
      </tr>
    </table>
    
    <pre> {{this.catInfo.elements}} </pre>


    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:100%; height: 500px;"
    >
  <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
    />
    </gmap-map>


  </div>


</template>

<script>
 
export default {
  name: 'HelloWorld',
  // data is where we hold component level mutatable data.
  data() {
    return {
      catInfo: [],
      breed: '',
      center: { lat: 51.4803771, lng: -0.2005484 },
      markers: [
        {
          position: {
            lat: 51.4803771, lng: -0.2005484
          },
        }
      ],
      zoom: 12,
      loc: '',
      selectedPubs: [],
    };
  },
  methods: {
    async getCatFact() {
      const response = await fetch('https://catfact.ninja/fact');
      this.catInfo = await response.json();
    },
    async getCatFactAdvanced() {
      console.log("Donwloading")
      const locresponse = await fetch(
      `https://api.postcodes.io/postcodes/${this.loc}`
      )
      
      const data = await locresponse.json()
      const lat = data.result.latitude;
      const lon = data.result.longitude;
      const radius = 1609.34;
      this.center = {lat : lat, lng : lon}
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
      const respJ = await response.json();
      this.catInfo = respJ.elements.filter((pub) => ('tags' in pub) && ('name' in pub.tags));

      respJ.elements.forEach(pub => {

        console.log(pub)

        const position =  {
            lat: parseFloat(pub.lat), lng: parseFloat(pub.lon)
          }
        console.log(this.markers)
        this.markers.push({ position: position });
      });
       
      

    
      //this.catInfo = respJ.elements.filter((pub) => pub.includes("tags") && pub.tags?.includes("name"));

    },
    pubToggle(pub){
      (!this.selectedPubs.includes(pub))? this.selectedPubs.push(pub) : this.selectedPubs.splice(this.selectedPubs.indexOf(pub), 1);;
    }
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
  max-width: 100px;
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
