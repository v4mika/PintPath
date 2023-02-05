<template>
    
  
  <div class="pubcrawl">

    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet"/>

  <!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->
<div class="bg-white">
  <!-- Header -->
  <div class="relative bg-gray-800 pb-32">
    <div class="absolute inset-0">
      <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100" alt="">
      <div class="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true"></div>
    </div>
    <div class="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">Drink out to help out</h1>
      <p class="mt-6 hidden max-w-3xl text-xl text-gray-300">Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames. Dui, amet, nec sit pulvinar.</p>
    </div>
  </div>

  <!-- Overlapping cards -->
  <section class="relative z-10 mx-auto -mt-32 max-w-8xl px-6 pb-32 lg:px-8" aria-labelledby="contact-heading">
    <h2 class="sr-only" id="contact-heading">Contact us</h2>


    <div class="grid grid-cols-1 gap-y-20 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">


      <div v-if="pubs.length > 0" class="flex flex-col rounded-2xl bg-white shadow-xl">
        <div class="relative flex-1 px-6 pt-16 pb-8 md:px-8">

          <fieldset>
    <legend class="text-lg font-medium text-gray-900">Your Pub Crawl</legend>
    <div class="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
      <div v-for="(pub,index) in pubs" :key="personIdx" class="relative flex items-start py-4">
        <div class="min-w-0 flex-1 text-sm">
          <label :for="`person-${pub.name}`" class="select-none mr-4 font-medium text-gray-700">{{ index+1 }}</label>
          <label :for="`person-${pub.name}`" class="select-none font-medium text-gray-700">{{ pub.name }}</label>
        </div>
        <div class="min-w-0 flex-1 text-sm">
         
        </div>
        <div class="ml-3 flex h-5 items-center">
          <input :id="`person-${pub.name}`" v-model="pub.selected" :name="`person-${pub.name}`" type="checkbox" v-on:change="updateSelected()" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        </div>
      </div>
      <div>
        <a href="/pubgolf">
          <button v-if="pubs.length != 0" type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Pub Golf!</button>
        </a>
      </div>
    </div>
     </fieldset>
           </div>

       
      </div>

      <div v-if="pubs.length == 0" class="flex flex-col rounded-2xl bg-white shadow-xl h-u">

      <div class="bg-white py-8 px-4  sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" v-on:submit="createCrawl">
          <div>
            <label for="postcode" class="block text-sm font-medium text-gray-700">Postcode</label>
            <div class="mt-1">
              <input id="postcode"  required="" v-model="loc" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div class="slidecontainer">
            <label for="myRange" class="block text-sm font-medium text-gray-700">Range: {{ pub_range }} mile(s)</label>
            <input type="range" v-model = "pub_range" min="1" max="5" step="0.1" value="1" class="slider" id="myRange">
          </div>

          <div>

            <button v-if="validatePostcode(loc)" type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create</button>
            <button disabled v-else class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Enter Valid Postcode</button>
          
          </div>
          </form>
          </div>
         
        </div>


      

  

    
      <div class="flex flex-col rounded-2xl bg-white shadow-xl">

        <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:100%; height: 500px;"
    >

  <div v-for="(m, index) in pubs">
    <gmap-marker
        :key="index"
        v-if="m.selected"
        :position="m.position"
        :clickable="true"
      />
      
      
  </div>
  
  <div  v-for="(p,i) in pub_crawl" >
    <DirectionsRenderer v-if="i<pub_crawl.length-1" :key="index" travelMode="WALKING" :origin="pub_crawl[i]?.position" :destination="pub_crawl[i+1]?.position"/>
 
  </div>
     </gmap-map>
  
      </div>
    </div>
  </section>
</div>

<div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Pub Golf</h1>
        <p class="mt-2 text-sm text-gray-700">Once you have created your pub crawl route, why have more fun and play a game of pub golf</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" @click="createPubGolf" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Create Pub Golf</button>
      </div>
    </div>
    
  
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr class="divide-x divide-gray-200">
                  <th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Hole</th>
                  <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Pub</th>
                  <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Drink</th>
                  <th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">Par</th>
                  <th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">Challenge</th>
                  <th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">Score</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(pub, index) in pubgolf" :key="pub.name" class="divide-x divide-gray-200">
                  <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">{{ index+1 }}</td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ pub.name }}</td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ pub.drink }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{{ pub.par }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{{ pub.challenge }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>





<div v-if="false">

    <nav>
          <NuxtLink to="/pubcrawl">Pub Crawl Creator</NuxtLink> |
          <NuxtLink to="/pubgolf">Pub Golf</NuxtLink>
    </nav>
    
    <h1>Pub Crawl App</h1>

    <input type="text" placeholder="Enter location here!"  />
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
        <td>{{ pub.name }}</td>
        <td>{{ pub.distance }}</td>
        <td>
          <!-- Here we have a conditional class, which means it only adds the class addedPub if selectedPubs includes pub -->
          <button
            :class="{ addedPub: pub_crawl.includes(pub) }"
            @click="pubToggle(pub)"
          >
          
            <!-- this logic determines weather a + or - sign is present depending on weather the item is in the list -->
            {{ pub.selected ? '+' : '-' }}
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

  <div v-for="(m, index) in pubs">
    <gmap-marker
        :key="index"
        v-if="m.selected"
        :position="m.position"
        :clickable="true"
      />
      
      
  </div>
  
 
  <DirectionsRenderer v-for="a in pub_crawl.length" :key="index" travelMode="WALKING" :origin="pub_crawl[a]?.position" :destination="pub_crawl[a+1]?.position"/>
    </gmap-map>
  

    <p  v-for="(m, index) in markers">{{ m.position }}</p>
    <p  v-for="(m, index) in pubs">{{ m.position }}</p>



  </div>

  
</div>

  



</template>

<script>
import {shortestRoute, sortRoutes} from '../components/RouteCalculator';

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
      pubgolf : [],
      pubs : [],
      pub_crawl: [],
      barChallenges: [
            "Take a picture with the bartender",
            "Sing a song in front of the whole bar",
            "Try to get a stranger to buy you a drink",
            "Do a shot with a group of strangers",
            "Do a beer chugging contest",
            "Dance with a stranger to a song played by the DJ",
            "Play a game of darts or pool against a stranger",
            "Take a group photo",
            "Ask a stranger to tell you a joke",
            "Try to get a barman to make you a custom drink",
            "Do a karaoke song",
            "Solve a crossword puzzle",
            "Try to convince the barman to give you a free drink",
            "Order a drink in a different language",
            "Get someone to take a picture of you with a stranger",
            "Do a dance-off with a stranger",
            "Do a shot with someone who is drinking a different drink than you",
            "Order a drink while giving someone a piggyback ride",
            "Order a drink using only hand gestures",
            "Get a stranger to draw you a picture",
            "Order a drink in rhyming couplets",
            "Order a drink with a fruit garnish",
            "Dance with a stranger",
            "Try to make a new friend at each remaining pub",
            "Blow a kiss at a stranger",
            "Get a stranger's phone number",
            "Do a shot with a bald guy",
            "Ask someone to marry you",
            "Dance on a table",
            "Do a body shot"
        ], 
        drinks: [
            {drink: "Drink of tallest player's choice", par: 3},
            {drink: "Drink of youngest player's choice", par: 2},
            {drink: "Drink of least-haired player's choice", par: 4},
            {drink: "Drink of weakest player's choice", par: 4},
            {drink: "Drink of most sober player's choice", par: 3},
            {drink: "Drink of smartest player's choice", par: 2},
            {drink: "Mixed drink of your choice", par: 2},
            {drink: "Draught Pint of your choice", par: 2},
            {drink: "Cocktail of your choice", par: 2},
            {drink: "Bartender's choice", par: 4},
            {drink: "Vodka RedBull", par: 2},
            {drink: "Vodka Coke", par: 2},
            {drink: "Malibu Pineapple", par: 2},
            {drink: "Gin & Tonic", par: 2},
            {drink: "Jager Bomb", par: 1},
            {drink: "Cheapest White", par: 2},
            {drink: "Cheapest Red", par: 2},
            {drink: "Tequila shot", par: 1},
            {drink: "Vodka shot", par: 1},
            {drink: "Sambuca shot", par: 1},
            {drink: "Large Baileys", par: 2},
            {drink: "Pint of Cider", par: 3},
            {drink: "IPA", par: 4}
        ],
        penalties: [
          {pen: "Spilling a drink", score: "+1"},
          {pen: "Not finishing your drink", score: "+1"},
          {pen: "Falling down", score: "+2"},
          {pen: "Missing a hole", score: "+2"},
          {pen: "Not finishing your drink", score: "+1"},
          {pen: "Getting kicked out, or being refused a drink", score: "+3"},
          {pen: "Throwing up", score: "+5"},
          {pen: "Cheating", score: "+5"},
        ],
      directions: null,
      pub_range: 1,
       people : [
  { id: 1, name: 'Annette Black' },
  { id: 2, name: 'Cody Fisher' },
  { id: 3, name: 'Courtney Henry' },
  { id: 4, name: 'Kathryn Murphy' },
  { id: 5, name: 'Theresa Webb' },
],


      origin: { lat: 51.4803771, lng: -0.2005484  },
      destination: { lat:  51.8803771, lng: -0.2005484 },

      postcode: ""
    };
  },

  methods: {
    async getCatFact() {
      const response = await fetch('https://catfact.ninja/fact');
      this.catInfo = await response.json();
    },
    async createPubGolf(){
      this.pubgolf = []
      this.pub_crawl.forEach(pub => {
        const drink = this.drinks[Math.floor(Math.random() * (this.drinks.length))]
        const challenge = this.barChallenges[Math.floor(Math.random() * (this.barChallenges.length))]
        this.pubgolf.push({name : pub.name, drink : drink.drink, par : drink.par, challenge : challenge})
      })
    },
    async updateSelected(){
      this.pub_crawl = this.pubs.filter(x => x.selected)
      this.pub_crawl = shortestRoute(this.pub_crawl, this.pub_crawl.length)
    },
    async createCrawl(e) {
      e.preventDefault();
      console.log("Donwloading")
      var locresponse = "";
      try {
      locresponse = await fetch(
      `https://api.postcodes.io/postcodes/${this.loc}`
      ) }catch(error){
        console.log(error);
        alert("Enter a valid postcode");
        this.loc = "";
        return;
      }
      
      const data = await locresponse.json()
      const lat = data.result.latitude;
      const lon = data.result.longitude;
      const radius = 1609.34 * this.pub_range;
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
      var response = ""
      try {
        response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: query,
      })}catch(error) {
        console.error(error);
        return;
      };

      const respJ = await response.json();

      if (respJ == undefined){
        alert("invalid postcode");
      }
      const nodes = respJ.elements;

      const maxPubs = 8


      function findNodeById(id){
        for (var i = 0; i < nodes.length; i++){
          const node = nodes[i];
          if (node.id == id){
            return node;
          }
        }
        return null;
      }
      console.log(nodes)
      nodes.forEach(node => {
        if (node.type == "way" && node.tags.name){
          const firstNode = findNodeById(node.nodes[0]);
          if (firstNode){
            this.pubs.push({"name" : node.tags.name, position:{lat : firstNode.lat, lng : firstNode.lon}, "selected" : false})
          }
        }else if(node.type = "node" && node.tags?.name ){
          this.pubs.push({"name" : node.tags.name,  position:{lat : node.lat, lng : node.lon}, "selected" : false})
        }
      })

      sortRoutes(this.pubs, lat, lon)
      console.log("My pubs: ")
      this.pub_crawl = shortestRoute(this.pubs, maxPubs)

      this.catInfo = this.pubs;

    /*  this.pubs.forEach(pub => {

        const position =  {
            lat: parseFloat(pub.lat), lng: parseFloat(pub.lon)
          }
        this.markers.push({ position: position });
      });*/
    
      //this.catInfo = respJ.elements.filter((pub) => pub.includes("tags") && pub.tags?.includes("name"));
    },

    validatePostcode: function validatePostcode(postcode){
          var postcodeRegEx = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i; 
          return postcodeRegEx.test(postcode); 
    },

    pubToggle(pub){
      pub.selected = !pub.selected
    }
  },
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only, 
    this means if I were to try to style anything outside of this file it wouldn't work! -->

