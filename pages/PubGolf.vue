<template>

    <div class="pubGolf">

        <nav>
            <NuxtLink to="/pubcrawl">Pub Crawl Creator</NuxtLink> |
            <NuxtLink to="/pubgolf">Pub Golf</NuxtLink>
        </nav>

        <h1>Pub Golf</h1>

        <!--probably temporary if we like link it to the route planned before? or should it be able seperate as well?-->
        <input type="text" placeholder="Enter how many holes in the course" v-model="loc" />
        <button @click="getCatFactAdvanced">Click Me!</button>

        <!--do we want a re-roll option if the drink is not at the pub?-->

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
      markers: [],
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
  }    
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

   