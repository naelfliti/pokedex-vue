import axios from 'axios';
import Pokemon from '../models/Pokemon'

export default class PokemonService {
    fetchPokemons(){
        return new Promise(resolve =>{
            const result = []
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386').then(response =>{
                console.log(response)
                const pokemonArray = response.data.results
                pokemonArray.forEach(p => {
                    const urlFragments = p.url.split('/')
                    const pokemonId = urlFragments[urlFragments.length - 2]
                    // const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
                    const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`
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
                result.animatedSpriteBackDefault = pokemonData.sprites.versions['generation-v']['black-white'].animated.back_default;
                result.animatedSpriteFrontDefault = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default;
                result.animatedSpriteBackShiny = pokemonData.sprites.versions['generation-v']['black-white'].animated.back_shiny;
                result.animatedSpriteFrontShiny = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_shiny;
                result.frontDefault = pokemonData.sprites.front_default;
                // On affecte les types.
                result.types = types;
                result.sound = `https://www.pokebip.com/audio/cris-sl/${id}.mp3`
                resolve(result);
            });
        });
    }
}