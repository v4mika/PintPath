<template>

    <div class="pubGolf">

        <nav>
            <NuxtLink to="/pubcrawl">Pub Crawl Creator</NuxtLink> |
            <NuxtLink to="/pubgolf">Pub Golf</NuxtLink>
        </nav>

        <h1>Pub Golf</h1>

        <!--probably temporary if we like link it to the route planned before? or should it be able seperate as well?-->
        <input type="text" placeholder="Enter how many holes in the course" v-model="loc" />
        <button @click="click">Click Me!</button>

        <!--do we want a re-roll option if the drink is not at the pub?-->


        <template>
        <table>
            <thead>
            <tr>
                <th>Hole</th>
                <th>Pub</th>
                <th>Drink</th>
                <th>Par</th>
                <th>Challenge</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="hole in holeNumbers()">
                <td>{{ hole }}</td>
                <td>{{ selectedPubs[hole - 1] }}</td>
                <td>{{ getRandomArray(drinks).drink}}</td>
                <td>{{ getRandomArray(drinks).par}}</td>
                <td>{{ getRandomArray(barChallenges) }}</td>
                <td>{{ }}
                    <!-- <select name="scores" id="scores">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="FAILED">FAILED</option>
                    </select> --></td>
            </tr>
            </tbody>
        </table>
        <br>
        <table>
            <thead>
            <tr>
                <th>Penalty</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="penalty in penalties">
                <td>{{ penalty.pen }}</td>
                <td>{{ penalty.score}}</td>
            </tr>
            </tbody>
        </table>

        </template>    

    </div>
</template>   


<script>
 
export default {
  name: 'Pub golf table',
  // data is where we hold component level mutatable data.
  data() {
    return {
        // this will be ordered by the algorithm
        selectedPubs: [
            "Slug",
            "Spoons",
            "Pub1",
            "Pub2",
            "Pub3"
        ],
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
        items: [
            { column1: "1", column2: "Slug", column3: "Jagerbomb", column4: "1" },
        ],
    };
  },
  methods: {
    getRandomArray(array) {
        return array[Math.floor(Math.random() * (array.length - 1))];
    },
    holeNumbers() {
        var numbers = [];
        for (var i = 1; i <= this.selectedPubs.length; i++) {
            numbers.push(i);
        }
        return numbers;
    },
    shuffleDrinks() {
        let currentIndex = this.drinks.length,  randomIndex;
        while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.drinks[currentIndex], this.drinks[randomIndex]] = [
        this.drinks[randomIndex], this.drinks[currentIndex]];

        return this.drinks;
  }

  return array;
}


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

   