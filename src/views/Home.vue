<template>
  <div class="home">
    <div class="hero">
      <h1>Bienvenue sur PokeApp</h1>
    </div>
    <v-container>
      <v-row class="text-center">
        <v-col
          cols="12"
          sm="3"
          v-for="(pokemon, index) in pokemons"
          :key="index"
          class="column"
        >
          <router-link v-bind:to="`/pokemon/${pokemon.id}`">
            <div class="result">
              <p>#{{ pokemon.id }} {{ pokemon.name }}</p>
              <v-img
                :src="pokemon.sprite"
                width="128"
                height="128"
                class="pokemon"
                @click="getPokemonDetails(pokemon)"
              />
            </div>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  h1 {
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: 900;
    font-style: italic;
  }
}
.column {
  display: flex;
  justify-content: center;
  p {
    margin: 0;
  }
  a {
    text-transform: capitalize;
  }
  &:hover {
    .pokemon {
      animation: $bounce;
    }
  }
}
</style>

<script>
import PokemonService from "../services/pokemonService";
export default {
  name: "Pokemons",
  components: {},
  data() {
    return {
      pokemons: [],
      selectedPokemon: undefined,
      pokemonService: new PokemonService(),
    };
  },
  mounted() {
    this.pokemonService.fetchPokemons().then((pokemon) => {
      this.pokemons = pokemon;
    });
  },
  methods: {
    getPokemonDetails(pokemon) {
      this.pokemonService.getPokemon(pokemon.id).then((result) => {
        console.log(result);
      });
    },
  },
};
</script>