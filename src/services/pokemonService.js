import axios from 'axios';
import Pokemon from '../models/Pokemon'

export default class PokemonService {
    getPokemon(url) {
        return new Promise(resolve => {
            axios.get(url).then( result => {
                const pokemon = new Pokemon(
                    result.data.id,
                    result.data.name,
                    result.data.sprites.front_default
                )
                resolve(pokemon);
            })
        })
    }
}