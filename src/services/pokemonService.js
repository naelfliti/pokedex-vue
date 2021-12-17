import axios from 'axios';
import Pokemon from '../models/Pokemon'

export default class PokemonService {
    fetchPokemons(){
        return new Promise(resolve =>{
            const result = []
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(response =>{
                console.log(response)
                const pokemonArray = response.data.results
                pokemonArray.forEach(p => {
                    const urlFragments = p.url.split('/')
                    const pokemonId = urlFragments[urlFragments.length - 2]
                    const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
                    const pokemon = new Pokemon(pokemonId, p.name);
                    pokemon.sprite = pokemonSprite;
                    result.push(pokemon);
                });
                resolve(result);
            })
        })
        
    }

    getPokemon(id) {
        return new Promise(resolve => {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + id).then(response => {
                // Contient les données du pokémon
                const pokemonData = response.data;
                // Mappe le nom de chaque type pour le récupérer sous forme de tableau.
                const types = pokemonData.types.map(t => {
                    return t.type.name
                })
                // Instancie le pokémon.
                const result = new Pokemon(pokemonData.id, pokemonData.name);
                // On affecte les sprites.
                result.backDefault = pokemonData.sprites.back_default;
                result.backFemale = pokemonData.sprites.back_female;
                result.backShiny = pokemonData.sprites.back_shiny;
                result.backShinyFemale = pokemonData.sprites.back_shiny_female;
                result.frontDefault = pokemonData.sprites.front_default;
                result.frontDemale = pokemonData.sprites.front_female;
                result.frontShiny = pokemonData.sprites.front_shiny;
                result.frontShinyFemale = pokemonData.sprites.front_shiny_female;
                // On affecte les types.
                result.types = types;
                result.sound = `https://www.pokebip.com/audio/cris-sl/${id}.mp3`
                resolve(result);
            });
        });
    }
}