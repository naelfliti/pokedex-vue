<template>
  <div class="pokemon">
    <div class="card">
      <v-skeleton-loader
        v-if="loading"
        class="loader"
        type="card"
      ></v-skeleton-loader>
      <div v-else>
        <div class="card--title" v-bind:style="backgroundColor">
          #{{ pokemon.id }} {{ pokemon.name }}
        </div>
        <div class="card--body">
          <div class="images">
            <img  v-on:click="pokemonCry"  class="image" v-bind:src="pokemon.frontDefault" alt="image du pokemon" />
            <img  v-on:click="pokemonCry"  class="image" v-bind:src="pokemon.backDefault" alt="image du pokemon" />
          </div>
          <audio controls :src="pokemon.sound"></audio>
        </div>
      </div>
    </div>

    <div class="link">
      <router-link v-bind:to="`/pokemon/${pokemon.id - 1}`">
        &lt; Pokémon précédent</router-link
      >
      <router-link v-bind:to="`/pokemon/${pokemon.id + 1}`"
        >Pokémon suivant &gt;</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
}
.pokemon {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader {
  width: 100%;
  height: 400px;
}

.card {
  width: 400px;
  &--title {
    text-transform: capitalize;
    padding: 20px;
    justify-content: center;
    font-weight: bold;
    height: 20%;
    display: flex;
    align-items: center;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
  &--body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .images {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    padding: 20px 0;
    background: $gray;
  }
}

.link {
  margin-top: 2rem;
  a {
    text-decoration: none;
    margin: 1rem;
  }
}
</style>

<script>
import PokemonService from "../services/pokemonService";
import {gsap, Bounce} from 'gsap'


export default {
  data() {
    return {
      pokemon: {},
      pokemonService: new PokemonService(),
      loading: false,
    };
  },
  methods: {
    pokemonCry: function (e) {
      gsap.from(e.target, {ease: Bounce.easeOut, y: -50, onStart: ()=>{
        document.querySelector('audio').play();
      } })
    }
  },
  watch: {
    "$route.params.id": function () {
      this.loading = true;
      this.pokemonService.getPokemon(this.$route.params.id).then((p) => {
        this.pokemon = p;
        this.loading = false;
        console.log(this.pokemon.sprite);
      });
    },
  },
  computed: {
    backgroundColor() {
      if (this.pokemon.types) {
        const colorArray = this.pokemon.types.map((type) => {
          switch (type) {
            case "normal":
              return "#a9aa91";
            case "fighting":
              return "#B93223";
            case "flying":
              return "#AC96E5";
            case "poison":
              return "#A6458E";
            case "ground":
              return "#DDC684";
            case "rock":
              return "#B49C3E";
            case "bug":
              return "#BAB4B4";
            case "ghost":
              return "#725896";
            case "steel":
              return "#BCBCD2";
            case "fire":
              return "#EF7B21";
            case "water":
              return "#6691ED";
            case "grass":
              return "#76C657";
            case "electric":
              return "#F4D553";
            case "psychic":
              return "#E9587F";
            case "ice":
              return "#95dbd9";
            case "dragon":
              return "#713DE1";
            case "dark":
              return "#EACED0";
            case "fairy":
              return "#E7A5DE";
            case "unknown":
              return "#fff";
            case "shadow":
              return "#292929";
            default:
              return "a3a9f5";
          }
        });

        let colorTypes;

        if (colorArray.length != 1) {
          colorTypes = colorArray.join(",");
        } else {
          colorTypes = `${colorArray} , ${colorArray}`;
        }

        return `background: linear-gradient(to left,${colorTypes})`;
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.loading = true;
    this.pokemonService.getPokemon(this.$route.params.id).then((p) => {
      this.pokemon = p;
      this.loading = false;
    });

  },
};
</script>